import { getEmailDetail } from "@/apis/emailDetail";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "./components/ProfileInfo";
import MyPageHeader from "./components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import { userDelete } from "@/apis/userDelete";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const email = "joajoa70584@gmail.com";

const MyPage = () => {
  const navigate = useNavigate();

  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEY.user.email(email),
    queryFn: () => getEmailDetail(email),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  let content;
  if (isPending) {
    content = <div className="px-5">Loading...</div>;
  }

  if (isError) {
    content = (
      <div>
        <h2>데이터를 불러오지 못했습니다.</h2>
        <p>예약 상세 정보를 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.</p>
      </div>
    );
  }

  const handleDeleteUser = async () => {
    const response = await userDelete();
    if (response.status === 200) {
      alert("회원탈퇴 되었습니다.");
      navigate("/");
    }
  };

  if (user) {
    content = (
      <div className="pt-8 px-8 pb-5 flex flex-col justify-between">
        <div>
          <MyPageHeader />
          <ProfileInfo user={user} />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-gray-scale-100 py-3 text-body1 text-gray-scale-200 rounded-lg">
              회원탈퇴
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                <div className="w-full flex justify-center pt-6 mb-4">
                  <div className="w-28 h-28 text-title text-red-500 bg-red-100 rounded-full flex items-center justify-center">
                    !
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription>
                <div className="text-center text-body1 mb-3">정말로 회원탈퇴 하시겠습니까?</div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={handleDeleteUser}
                className="w-24 bg-gray-scale-100 py-2 text-sub-body1 text-gray-scale-400 rounded-lg"
              >
                네
              </button>
              <DialogClose className="w-24 bg-gray-scale-200 py-2 text-sub-body1 text-gray-scale-0 rounded-lg">
                아니오
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return <>{content}</>;
};

export default MyPage;
