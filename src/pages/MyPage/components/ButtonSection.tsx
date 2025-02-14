import { userDelete } from "@/apis/userDelete";
import { userLogout } from "@/apis/userLogout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ButtonSection = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response.status === 200) {
      alert("로그아웃 되었습니다.");
      navigate("/");
    }
  };

  const handleDeleteUser = async () => {
    const response = await userDelete();
    if (response.status === 200) {
      alert("회원탈퇴 되었습니다.");
      navigate("/");
    }
  };
  return (
    <article>
      <Button onClick={handleLogout} className="w-full mb-4">
        로그아웃
      </Button>
      <Button onClick={handleDeleteUser} className="w-full">
        회원탈퇴
      </Button>
    </article>
  );
};

export default ButtonSection;
