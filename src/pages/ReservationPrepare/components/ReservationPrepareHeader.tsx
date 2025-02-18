import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

const ReservationPrepareHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between mb-5">
      <div className="cursor-pointer" onClick={() => navigate(-1)}>
        <img src="/images/goToBack-icon.svg" alt="뒤로가기" />
      </div>
      <button onClick={() => navigate(PATH.designerList)} className="text-gray-scale-300">
        <img src="/images/home-icon.svg" alt="홈" />
      </button>
    </header>
  );
};
export default ReservationPrepareHeader;
