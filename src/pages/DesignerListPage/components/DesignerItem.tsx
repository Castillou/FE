import { Designer } from "@/types/apiTypes";
import { DesignerMode } from "@/types/types";
import designerModeFormat from "@/utils/designerModeFormat";

interface DesignerItemProps {
  designer: Designer;
}

const DesignerItem = ({ designer }: DesignerItemProps) => {
  return (
    <div className="bg-white ">
      <div className="border-b border-gray-200 py-[22px] px-[28px] flex justify-between">
        <div className="w-[166px] ">
          <p className="text-[10px] mb-2 text-[#737373]">{designer.shop_address}</p>
          <p className="text-[15px] mb-2">{designer.name}</p>
          <p className="text-[13px] text-[#676767]">{designer.introduction}</p>
          <div className="flex gap-2 mt-4">
            <div className="bg-[#D896FF] rounded-full px-2 py-[2px]">
              <span className="text-[12px] text-white whitespace-nowrap">
                {designer.specialties} 전문
              </span>
            </div>
            {designerModeFormat(designer.available_modes as DesignerMode)?.map((mode) => (
              <div className="bg-[#f4f4f4] rounded-full px-2 py-[2px] whitespace-nowrap" key={mode}>
                <span className="text-[11px]">{mode}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            src="https://placehold.co/118x118?text=haertz"
            alt="designer image"
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignerItem;
