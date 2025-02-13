// import { userLogout } from "@/apis/userLogout";
// import { userDelete } from "@/apis/userDelete";
import { Button } from "@/components/ui/button";
import { User } from "@/types/apiTypes";

interface ProfileInfoProps {
  user: User;
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  const handleLogout = () => {
    // userLogout();
    alert("로그아웃 되었습니다.");
  };

  const handleDeleteUser = () => {
    // userDelete();
    alert("회원탈퇴 되었습니다.");
  };

  return (
    <section className="px-4">
      <article className="flex gap-4 items-center mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={user.profile_image} alt="프로필 이미지" className="size-full object-cover" />
        </div>
        <div className="">
          <h3 className="text-sub-title font-semibold">{user.name}</h3>
          <p className="text-body2 text-gray-scale-300">{user.email}</p>
        </div>
      </article>
      <Button onClick={handleLogout} className="w-full mb-4">
        로그아웃
      </Button>
      <Button onClick={handleDeleteUser} className="w-full">
        회원탈퇴
      </Button>
    </section>
  );
};

export default ProfileInfo;
