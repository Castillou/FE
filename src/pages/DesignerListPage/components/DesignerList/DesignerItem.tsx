import { PATH } from "@/constants/path";
import { Designer } from "@/types/apiTypes";
import { DesignerMode } from "@/types/types";
import designerModeFormat from "@/utils/designerModeFormat";
import { useNavigate } from "react-router-dom";
interface DesignerItemProps {
  designer: Designer;
}

const DesignerItem = ({ designer }: DesignerItemProps) => {
  const navigate = useNavigate();

  return (
    <li
      className="bg-white px-7 cursor-pointer"
      onClick={() => navigate(PATH.designerDetail(designer.id))}
    >
      <article className="w-full border-b  mt-4 border-gray-200 py-[22px] flex justify-between">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-[11px] mb-2 text-[#737373]">{designer.region}</p>
            <p className="text-[18px] font-bold mb-2">{designer.name}</p>
            <p className="w-48 whitespace-nowrap overflow-hidden text-ellipsis text-body2 text-[#676767]">
              {designer.introduction}
            </p>
          </div>
          <div className="flex gap-2">
            <div className="bg-primary-100 rounded-full px-3 py-[2px]">
              <span className="text-body2 text-white whitespace-nowrap">
                {designer.specialties} 전문
              </span>
            </div>
            {designerModeFormat(designer.available_modes as DesignerMode)?.map((mode) => (
              <div className="bg-[#f4f4f4] rounded-full px-3 py-[2px] whitespace-nowrap" key={mode}>
                <span className="text-[11px]">{mode}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-7">
          <img
            src={designer.profile_image || "/images/DEFAULT_PROFILE.jpg"}
            onError={(e) => {
              e.currentTarget.src = "/images/DEFAULT_PROFILE.jpg";
            }}
            alt="designer image"
            className="object-cover rounded-md w-[68px] h-[68px]"
          />
          <span className="text-[18px]">
            {designer.available_modes === "대면"
              ? designer.face_consulting_fee.toLocaleString()
              : designer.non_face_consulting_fee.toLocaleString()}
            원~
          </span>
        </div>
      </article>
    </li>
  );
};

export default DesignerItem;
