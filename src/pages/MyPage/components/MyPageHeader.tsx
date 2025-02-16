import { userLogout } from "@/apis/userLogout";
import { useNavigate } from "react-router-dom";

const MyPageHeader = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response.status === 200) {
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };
  return (
    <header className="flex items-center justify-between mb-5">
      <div onClick={() => navigate(-1)}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.875 12.4999H3.125M3.125 12.4999L11.9792 3.64575M3.125 12.4999L11.9792 21.3541"
            stroke="black"
            strokeWidth="1.14583"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <button onClick={handleLogout} className="text-gray-scale-300">
        로그아웃
      </button>
    </header>
  );
};
export default MyPageHeader;
