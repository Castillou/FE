import { Slider } from "@/components/ui/slider";
import { useState } from "react";

const DesignerFilterDrawer = () => {
  const [data, setData] = useState(20000);

  console.log(data);

  return (
    <div className="text-center px-8">
      {/* 대면 컨설팅 방식 필터 */}
      <div className="pb-4">
        <h3 className="text-[32px] pb-2">컨설팅 방식</h3>

        <div className="flex justify-around">
          <div className="px-6 py-4 bg-gray-500 rounded-md">
            <p>대면</p>
            <p>2만원</p>
          </div>
          <div className="px-6 py-4 bg-gray-500 rounded-md">
            <p>비대면</p>
            <p>3만원</p>
          </div>
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="pb-4">
        <h3 className="text-[32px] pb-2">지역</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="px-6 py-4 bg-gray-500 rounded-lg">강남</div>
          <div className="px-6 py-4 bg-gray-500 rounded-lg">청담</div>
          <div className="px-6 py-4 bg-gray-500 rounded-lg">압구정</div>
          <div className="px-6 py-4 bg-gray-500 rounded-lg">홍대</div>
          <div className="px-6 py-4 bg-gray-500 rounded-lg">연남</div>
          <div className="px-6 py-4 bg-gray-500 rounded-lg">합정</div>
        </div>
      </div>

      {/* 가격 필터 */}
      <div>
        <h3 className="text-[32px] pb-2">가격</h3>

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
