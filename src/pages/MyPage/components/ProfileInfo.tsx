import { userLogout } from "@/apis/userLogout";
import { PATH } from "@/constants/path";
import { UserMeResponse } from "@/types/user";
import { useNavigate } from "react-router-dom";
import DeleteUserDialog from "./DeleteUserDialog";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { getReservationList } from "@/apis/reservation";
interface ProfileInfoProps {
  user: UserMeResponse;
  handleDeleteUser: () => void;
}

const ProfileInfo = ({ user, handleDeleteUser }: ProfileInfoProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await userLogout();
    if (response.message) {
      alert("로그아웃 되었습니다.");
    }
    navigate(PATH.login);
  };

  const { data: reservationList } = useQuery({
    queryKey: QUERY_KEY.reservationList.list(user.user_id),
    queryFn: () => getReservationList(user.user_id),
  });

  return (
    <section>
      <article className="mb-6">
        <h2 className="text-[24px] font-bold">마이페이지</h2>
      </article>

      <article className="flex items-center mb-6 gap-[18px]">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden">
          <img src={user.profile_image} alt="프로필 이미지" className="size-full object-cover" />
        </div>
        <div>
          <h3 className="text-center text-2xl font-bold">{user.name}</h3>
        </div>
      </article>

      <article className="flex items-center justify-evenly mb-6 bg-[#F7F7F7] rounded-lg p-4">
        <div className="flex flex-col items-center gap-[7px] w-[70px]">
          <span className="text-[#000] font-bold">{reservationList?.length}</span>

          <span className="text-[14px] text-[#676767]">예약</span>
        </div>
        <div className="w-[2px] h-[45px] bg-[#D9D9D9]"></div>
        <div className="flex flex-col items-center gap-[7px] w-[70px]">
          <span className="text-[#000] font-bold">2</span>
          <span className="text-[14px] text-[#676767]">관심요소</span>
        </div>
      </article>

      <div className="w-full h-2 bg-[#F2F1F6]"></div>

      <article className="mb-8">
        <div className="py-[18px] border-b border-selected-default">
          <span onClick={handleLogout} className="text-[14px] text-[#676767] cursor-pointer">
            로그아웃
          </span>
        </div>
        <div className="py-[18px] border-b border-selected-default">
          <span
            onClick={() => setIsDeleteDialogOpen(true)}
            className="text-[14px] text-[#676767] cursor-pointer"
          >
            회원탈퇴
          </span>
        </div>
      </article>

      <DeleteUserDialog
        onDelete={handleDeleteUser}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      />
    </section>
  );
};

export default ProfileInfo;
