import { userDelete } from "@/apis/userDelete";
import { useNavigate } from "react-router-dom";
import MyPageHeader from "./components/MyPageHeader";
import ProfileInfo from "./components/ProfileInfo";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { getUserMe } from "@/apis/user";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const MyPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEY.user.me,
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "오류가 발생했습니다.",
        description: error.message,
        duration: 3000,
      });
    }
  }, [isError, error, toast]);

  const handleDeleteUser = async () => {
    const response = await userDelete();
    if (response.message) {
      alert("회원탈퇴 되었습니다.");
      navigate("/");
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="사용자 정보를 불러오는 중..." />;
  }

  if (isError) {
    return (
      <div className="pt-8 px-8 pb-5 flex flex-col justify-between min-h-[calc(100vh-64px)]">
        <div>
          <MyPageHeader />
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">데이터를 불러오지 못했습니다.</h2>
            <p className="text-gray-600">
              유저 정보를 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.
            </p>
          </div>
        </div>
        <Toaster />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="pt-8 px-8 pb-5 flex flex-col justify-between min-h-[calc(100vh-64px)]">
        <div>
          <MyPageHeader />
          <div className="mt-8 text-center">
            <p className="text-gray-600">사용자 정보가 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8 px-8 pb-5 flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <div>
        <MyPageHeader />
        <ProfileInfo user={data} handleDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default MyPage;
