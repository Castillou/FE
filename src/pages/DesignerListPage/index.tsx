import { getDesignerList } from "@/apis/designerList";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import DesignerList from "./components/DesignerList/DesignerList";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { DesignerFilterMode, DesignerLocation, FilterOptions } from "@/types/types";
import FilteredOptionBox from "./components/DesignerFilter/FilteredOptionBox";
import FilterDrawer from "./components/DesignerFilter/FilterDrawer";
import { handleLocation, handleMode } from "@/utils/filterOption";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const DesignerListPage = () => {
  const { toast } = useToast();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    designer_mode: undefined,
    designer_location: ["서울 전체"],
    min_consulting_fee: 0,
    max_consulting_fee: 40000,
  });

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (accessToken && refreshToken) {
      Cookies.set("access_token", accessToken, { secure: true, sameSite: "strict" });
      Cookies.set("refresh_token", refreshToken, { secure: true, sameSite: "strict" });
      // Remove tokens from URL after storing in cookies
      navigate(location.pathname, { replace: true });
    }
  }, [location, navigate]);

  // 모드 필터링 체크 함수
  const handleModeChange = (mode: DesignerFilterMode) => {
    handleMode(mode, filterOptions, setFilterOptions);
  };

  // 지역 필터링 체크 함수
  const handleLocationChange = (location: DesignerLocation) => {
    handleLocation(location, filterOptions, setFilterOptions);
  };

  // 디자이너 리스트 조회
  const {
    data: designerData,
    isPending: designerPending,
    isError: designerError,
    error,
  } = useQuery({
    queryKey: QUERY_KEY.designer.list({ ...filterOptions }),
    queryFn: () => getDesignerList(filterOptions),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  useEffect(() => {
    if (designerError) {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: "디자이너 목록을 불러오는데 실패했습니다.",
        duration: 3000,
      });
    }
  }, [designerError, error, toast]);

  if (designerPending) {
    return <LoadingSpinner text="디자이너 목록을 불러오는 중..." />;
  }

  return (
    <>
      {designerData && (
        <div>
          <div className="w-full pt-[50px]">
            <div className="flex justify-between items-end pb-[18px] px-6">
              <p className="text-[40px] leading-[44px] text-[#D896FF]">
                <strong className="text-[#D896FF]">땅콩형 얼굴</strong>이 <br />
                고민이에요
              </p>

              <div className="cursor-pointer">
                <p className="text-[#D896FF] border-b border-[#D896FF]">변경</p>
              </div>
            </div>

            <div className="w-full flex justify-between px-6 py-4 border-b border-t border-gray-200">
              <div className="flex flex-wrap gap-2 w-[80%]">
                {/* 지역 필터링 */}
                {filterOptions.designer_location?.map((option) => (
                  <FilteredOptionBox
                    key={option}
                    option={option}
                    type={"location"}
                    handleLocationChange={handleLocationChange}
                    handleModeChange={handleModeChange}
                  ></FilteredOptionBox>
                ))}
                {/* 모드 필터링 */}
                {filterOptions.designer_mode && (
                  <FilteredOptionBox
                    option={filterOptions.designer_mode}
                    type={"mode"}
                    handleModeChange={handleModeChange}
                    handleLocationChange={handleLocationChange}
                  ></FilteredOptionBox>
                )}
              </div>

              <div onClick={() => setIsDrawerOpen(true)} className="cursor-pointer">
                <img src="/images/mage_filter.svg" alt="필터" />
              </div>
            </div>

            {/* 디자이너 리스트 */}
            <DesignerList designers={designerData} />

            <FilterDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
              setFilterOptions={setFilterOptions}
              filterOptions={filterOptions}
            ></FilterDrawer>
          </div>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default DesignerListPage;
