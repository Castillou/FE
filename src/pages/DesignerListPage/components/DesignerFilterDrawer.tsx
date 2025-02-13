import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const DesignerFilterDrawer = () => {
  const [data, setData] = useState(20000);

  console.log(data);

  const locationList = ["서울 전체", "홍대/연남/합정", "강남/청담/압구정", "성수/건대"] as const;

  return (
    <div className="pt-4">
      {/* 대면 컨설팅 방식 필터 */}
      <div className="w-full border-b border-[#F2F2F2]">
        <div className="mb-[18px]">
          <strong className="block text-[16px] mb-[6px]">컨설팅 방식</strong>
          <p className="text-[12px] text-[#868686] leading-[16px]">
            소요시간 약 30분 <br />
            컨설팅 내용은 진행 후 요약된 리포트를 고객에게 전달됩니다.
          </p>
        </div>

        <div className="flex gap-2 pb-7">
          <div className="border border-[#F2F2F2] py-4 px-4 w-[50%]">
            <p>
              대면 <span className="text-[#D9D9D9]">(30,000원~)</span>
            </p>
            <p className="text-[10px]">실제 샵에 방문하여 컨설팅 진행</p>
          </div>
          <div className="border border-[#F2F2F2] py-4 px-4 w-[50%] flex flex-col justify-center items-center">
            <p>비대면</p>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="w-full border-b border-[#F2F2F2] pb-4">
        <div className="my-4">
          <strong className="block text-[16px] mb-[6px]">지역</strong>
        </div>

        <div className="flex flex-wrap gap-2 text-[14px]">
          {locationList.map((location) => (
            <div
              key={location}
              className={`rounded-full px-2 py-1 ${
                location === "서울 전체" ? "bg-[#D896FF]" : "bg-[#F0F0F0]"
              }`}
            >
              {location}
            </div>
          ))}
        </div>
      </div>

      {/* 가격 필터 */}
      <div className="w-full border-b border-[#F2F2F2] pb-4">
        <div className="my-4">
          <strong className="block text-[16px] mb-[6px]">지역</strong>
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
              defaultValue={[20000]}
              max={50000}
              step={1000}
              onValueChange={(value) => setData(value[0])}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignerFilterDrawer;
