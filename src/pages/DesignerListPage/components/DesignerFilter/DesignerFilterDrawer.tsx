import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { DesignerFilterMode, DesignerLocation, FilterOptions } from "@/types/types";

const DesignerFilterDrawer = ({
  handleModeChange,
  handleLocationChange,
  handleFeeChange,
  selectedOption,
}: {
  handleModeChange: (mode: DesignerFilterMode) => void;
  handleLocationChange: (location: DesignerLocation) => void;
  handleFeeChange: (min: number, max: number) => void;
  selectedOption: FilterOptions;
}) => {
  const [maxData, setMaxData] = useState(selectedOption.max_consulting_fee);
  const [minData, setMinData] = useState(selectedOption.min_consulting_fee);

  const locationList = ["서울 전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"] as const;

  useEffect(() => {
    setMinData(selectedOption.min_consulting_fee);
    setMaxData(selectedOption.max_consulting_fee);
  }, [selectedOption]);

  return (
    <div className="pt-4" onClick={(e) => e.stopPropagation()}>
      {/* 대면 컨설팅 방식 필터 */}
      <div className="w-full border-b border-[#F2F2F2] pb-6">
        <div className="mb-[18px]">
          <strong className="block text-[16px] mb-[6px]">컨설팅 방식</strong>
          <p className="text-[12px] text-[#868686] leading-[16px]">
            소요시간 약 30분 <br />
            컨설팅 내용은 진행 후 요약된 리포트를 고객에게 전달됩니다.
          </p>
        </div>

        <div className="flex flex-col gap-[10px] text-gray-scale-400">
          {/* 대면 */}
          <div
            className={`border border-[#F2F2F2] rounded-lg px-[14px] py-[12px] cursor-pointer ${
              selectedOption.designer_mode === "대면"
                ? "bg-primary-100 text-selected-default"
                : " bg-gray-scale-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("대면");
            }}
          >
            <span className="text-[16px] font-bold">대면 </span>
            <span className="text-[16px]">30,000원~</span>
            <p
              className={`text-[11px] ${
                selectedOption.designer_mode === "대면"
                  ? "text-selected-default"
                  : "text-gray-scale-300"
              }`}
            >
              실제 샵에 방문하여 컨설팅 진행
            </p>
          </div>

          {/* 비대면 */}
          <div
            className={`border border-[#F2F2F2] rounded-lg px-[14px] py-[12px] cursor-pointer ${
              selectedOption.designer_mode === "비대면"
                ? "bg-primary-100 text-selected-default"
                : "bg-gray-scale-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("비대면");
            }}
          >
            <span className="text-[16px] font-bold">비대면 </span>
            <span className="text-[16px]">20,000원~</span>
            <p
              className={`text-[11px] ${
                selectedOption.designer_mode === "비대면"
                  ? "text-selected-default"
                  : "text-gray-scale-300"
              }`}
            >
              예약 완료 후 Google Meet 링크가 생성되어 화상 컨설팅 진행
            </p>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="w-full border-b border-[#F2F2F2] pb-6 mt-6">
        <div>
          <strong className="block text-[16px] mb-[6px]">지역</strong>
        </div>

        <div className="flex flex-wrap gap-2 text-[14px] text-gray-scale-400">
          {locationList.map((location) => (
            <div
              key={location}
              className={`rounded-full px-2 py-1 cursor-pointer ${
                selectedOption.designer_location?.includes(location)
                  ? "bg-primary-100 text-selected-default"
                  : "bg-gray-scale-100"
              }`}
              onClick={() => handleLocationChange(location)}
            >
              {location}
            </div>
          ))}
        </div>
      </div>

      {/* 가격 필터 */}
      <div className="w-full pb-4 mt-6">
        <div>
          <strong className="block text-[16px] mb-3">가격 범위</strong>
        </div>

        <div className="w-full mx-auto">
          <div>
            <div>
              <div className="whitespace-nowrap text-primary-100 mb-3 font-bold">
                {minData.toLocaleString()}원 ~ {maxData.toLocaleString()}원
              </div>
            </div>
            <div className="flex justify-between text-[12px] text-gray-scale-300 mb-2">
              <p>최소</p>
              <p>최대</p>
            </div>
            <Slider
              defaultValue={[selectedOption.min_consulting_fee, selectedOption.max_consulting_fee]}
              min={0}
              max={50000}
              step={1000}
              onValueChange={(value) => {
                setMinData(value[0]);
                setMaxData(value[1]);
                handleFeeChange(value[0], value[1]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerFilterDrawer;
