import { Button } from "@/components/ui/button";

import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer";
import DesignerFilterDrawer from "./DesignerFilterDrawer";
import { DesignerFilterMode, DesignerLocation, FilterOptions } from "@/types/types";
import { useEffect, useState } from "react";
import { getDesignerList } from "@/apis/designerList";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { handleLocation, handleMode } from "@/utils/filterOption";
import { useDebounce } from "@/hooks/useDebounce";

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
    min_consulting_fee: 0,
    max_consulting_fee: 40000,
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

  const handleFeeChange = (min: number, max: number) => {
    setSelectedOption((prev) => ({ ...prev, min_consulting_fee: min, max_consulting_fee: max }));
  };

  const debouncedOptions = useDebounce(selectedOption, 100); // 100ms 후 요청

  const { data: designerList } = useQuery({
    queryKey: QUERY_KEY.designer.list({ ...debouncedOptions }),
    queryFn: () => getDesignerList(debouncedOptions),
  });

  const submitFilterOptions = () => {
    setFilterOptions(selectedOption);
    setIsDrawerOpen(false);
  };

  const resetFilterOptions = () => {
    setSelectedOption({
      designer_mode: undefined,
      designer_location: ["서울 전체"],
      min_consulting_fee: 0,
      max_consulting_fee: 40000,
    });
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="min-w-[375px] max-w-[430px] m-auto px-[18px] pb-[12px]">
        {/* 필터 */}
        <DesignerFilterDrawer
          selectedOption={selectedOption}
          handleModeChange={handleModeChange}
          handleLocationChange={handleLocationChange}
          handleFeeChange={handleFeeChange}
        />
        <DrawerFooter className="flex flex-row justify-between gap-2 px-0">
          <Button
            className="bg-[none] text-[#000] border-none hover:bg-[none]"
            onClick={resetFilterOptions}
          >
            <span>초기화</span>
          </Button>
          <DrawerClose className="flex w-full">
            <Button
              variant="outline"
              className="bg-primary-100 w-full text-white"
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
