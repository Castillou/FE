import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import DesignerFilterDrawer from "./DesignerFilterDrawer";
import { DesignerFilterMode, DesignerLocation, FilterOptions } from "@/types/types";
import { useEffect, useState } from "react";
import { getDesignerList } from "@/apis/designerList";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { handleLocation, handleMode } from "@/utils/filterOption";

const FilterDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  setFilterOptions,
  filterOptions,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isDrawerOpen: boolean) => void;
  setFilterOptions: (filterOptions: FilterOptions) => void;
  filterOptions: FilterOptions;
}) => {
  const [selectedOption, setSelectedOption] = useState<FilterOptions>({
    designer_mode: undefined,
    designer_location: ["서울 전체"],
  });

  useEffect(() => {
    setSelectedOption(filterOptions);
  }, [filterOptions]);

  const handleModeChange = (mode: DesignerFilterMode) => {
    handleMode(mode, selectedOption, setSelectedOption);
  };

  const handleLocationChange = (location: DesignerLocation) => {
    handleLocation(location, selectedOption, setSelectedOption);
  };

  const { data: designerList } = useQuery({
    queryKey: QUERY_KEY.designer.list({ ...selectedOption }),
    queryFn: () => getDesignerList(selectedOption),
  });

  const submitFilterOptions = () => {
    setFilterOptions(selectedOption);
    setIsDrawerOpen(false);
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="min-w-[375px] max-w-[430px] m-auto px-[18px] pb-[18px]">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        {/* 필터 */}
        <DesignerFilterDrawer
          selectedOption={selectedOption}
          handleModeChange={handleModeChange}
          handleLocationChange={handleLocationChange}
        />
        <DrawerFooter>
          <DrawerClose>
            <Button
              variant="outline"
              className="bg-[#D896FF] w-full text-white mt-[107px] rounded-[12px]"
              onClick={submitFilterOptions}
            >
              {designerList?.length}건의 결과보기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
