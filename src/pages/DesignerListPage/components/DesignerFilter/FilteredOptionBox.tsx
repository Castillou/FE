import { DesignerFilterMode, DesignerLocation } from "@/types/types";

const FilteredOptionBox = ({
  option,
  type,
  handleModeChange,
  handleLocationChange,
}: {
  option: DesignerLocation | DesignerFilterMode;
  type: "location" | "mode";
  handleModeChange: (mode: DesignerFilterMode) => void;
  handleLocationChange: (location: DesignerLocation) => void;
}) => {
  if (type === "location") {
    return (
      <div className="text-[#868686] text-[13px] flex items-center gap-1">
        <span>{option}</span>
        {option !== "서울 전체" && (
          <img
            src="/images/delete_option.svg"
            alt="옵션 삭제"
            className="w-4 h-4 cursor-pointer"
            onClick={() => handleLocationChange(option as DesignerLocation)}
          />
        )}
      </div>
    );
  }

  if (type === "mode") {
    return (
      <div className="text-[#868686] text-[13px] flex items-center gap-1">
        <span>{option}</span>
        <img
          src="/images/delete_option.svg"
          alt="옵션 삭제"
          className="w-4 h-4 cursor-pointer"
          onClick={() => handleModeChange(option as DesignerFilterMode)}
        />
      </div>
    );
  }

  return null;
};

export default FilteredOptionBox;
