import { getEmailDetail } from "@/apis/emailDetail";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import ProfileInfo from "./components/ProfileInfo";
import Header from "@/components/common/Header";

const email = "joajoa70584@gmail.com";

const MyPage = () => {
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

  if (user) {
    content = (
      <>
        <Header />
        <ProfileInfo user={user} />
      </>
    );
  }

  return <>{content}</>;
};

export default MyPage;
