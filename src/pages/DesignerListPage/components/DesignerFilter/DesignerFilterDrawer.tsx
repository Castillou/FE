import { Slider } from "@/components/ui/slider";
import { useState } from "react";
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
  const [data, setData] = useState(selectedOption.max_consulting_fee || 20000);

  const locationList = ["서울 전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"] as const;

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

        <div className="flex gap-2 text-gray-scale-400">
          {/* 대면 */}
          <div
            className={`border border-[#F2F2F2] rounded-lg py-4 px-4 w-[50%] flex flex-col justify-center items-center cursor-pointer ${
              selectedOption.designer_mode === "대면" ? "bg-primary-100" : " bg-gray-scale-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("대면");
            }}
          >
            <p className="text-[14px]">대면</p>
            <p className="text-[12px]">30,000원~</p>
          </div>

          {/* 비대면 */}
          <div
            className={`border border-[#F2F2F2] rounded-lg py-4 px-4 w-[50%] flex flex-col justify-center items-center cursor-pointer  ${
              selectedOption.designer_mode === "비대면" ? "bg-primary-100" : "bg-gray-scale-100"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleModeChange("비대면");
            }}
          >
            <p className="text-[14px]">비대면</p>
            <p className="text-[12px]">20,000원~</p>
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
                  ? "bg-primary-100"
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
      <div className="w-full mt-6">
        <div>
          <strong className="block text-[16px] mb-[6px]">가격</strong>
        </div>

        <div className="w-[80%] mx-auto">
          <div className="relative pt-6">
            <div
              className="absolute top-[-1.5px] translate-x-[-50%]"
              style={{ left: `${((data - 0) / (50000 - 0)) * 100}%` }}
            >
              <div className="whitespace-nowrap">{data.toLocaleString()}원</div>
            </div>
            <Slider
              defaultValue={[selectedOption.max_consulting_fee || 20000]}
              min={0}
              max={50000}
              step={1000}
              onValueChange={(value) => {
                setData(value[0]);
                handleFeeChange(0, value[0]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerFilterDrawer;
