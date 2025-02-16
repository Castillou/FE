import { DesignerFilterMode, DesignerLocation, FilterOptions } from "@/types/types";

export const handleMode = (
  mode: DesignerFilterMode,
  option: FilterOptions,
  setOption: (option: FilterOptions | ((prev: FilterOptions) => FilterOptions)) => void
) => {
  if (option.designer_mode === mode) {
    setOption((prev) => ({ ...prev, designer_mode: undefined }));
  } else {
    setOption((prev) => ({ ...prev, designer_mode: mode }));
  }
};

export const handleLocation = (
  location: DesignerLocation,
  option: FilterOptions,
  setOption: (option: FilterOptions | ((prev: FilterOptions) => FilterOptions)) => void
) => {
  if (location === "서울 전체") {
    // 서울 전체 선택
    setOption((prev) => ({ ...prev, designer_location: ["서울 전체"] }));
  } else {
    if (option.designer_location?.includes(location)) {
      // 이미 선택된 지역 해제

      // 해당 지역을 제거한 배열
      const filteredLocation = option.designer_location.filter((loc) => loc !== location);

      setOption((prev) => ({
        ...prev,
        designer_location: filteredLocation,
      }));

      // 모든 지역이 제거되었으면 "서울 전체"를 추가
      if (filteredLocation.length === 0) {
        setOption((prev) => ({ ...prev, designer_location: ["서울 전체"] }));
      }
    } else {
      // 새로운 지역 추가시 "서울 전체"를 제거하고 해당 지역 추가
      const newLocations = option
        .designer_location!.filter((loc) => loc !== "서울 전체")
        .concat(location);
      setOption((prev) => ({
        ...prev,
        designer_location: newLocations,
      }));
    }
  }
};
