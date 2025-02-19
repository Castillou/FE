import { useQuery } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import Footer from "@/components/common/Footer";
import { getReservationList } from "@/apis/reservation";
import ReservationList from "./components/ReservationList";
import { getUserMe } from "@/apis/user";
import { Toaster } from "@/components/ui/toaster";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import MyPageHeader from "../MyPage/components/MyPageHeader";

const ReservationListPage = () => {
  const {
    data: user,
    isPending: userIsPending,
    isError: userIsError,
    error: userError,
  } = useQuery({
    queryKey: QUERY_KEY.user.me,
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  const {
    data: reservations,
    isPending: reservationIsPending,
    isError: reservationIsError,
    error: reservationError,
  } = useQuery({
    queryKey: QUERY_KEY.reservationList.list(user?.user_id ?? ""),
    queryFn: () => getReservationList(user?.user_id ?? ""),
    enabled: !!user?.user_id,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });

  useEffect(() => {
    if (userIsError || reservationIsError) {
      if (userIsError) {
        toast({
          variant: "destructive",
          title: "인증 오류",
          description: userError?.message,
          duration: 3000,
        });
      } else {
        toast({
          variant: "destructive",
          title: "예약 목록 조회 실패",
          description: reservationError?.message,
          duration: 3000,
        });
      }
    }
  }, [userIsError, userError, toast]);

  const renderContent = () => {
    if ((userIsPending || reservationIsPending) && !userIsError && !reservationIsError) {
      return (
        <div className="mt-8 text-center">
          <p className="text-gray-600">로딩중...</p>
        </div>
      );
    }

    if (userIsError || reservationIsError) {
      return (
        <div className=" p-8">
          <h2 className="text-lg font-semibold mb-2">데이터를 불러오지 못했습니다.</h2>
          <p className="text-gray-600">
            예약 목록을 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.
          </p>
        </div>
      );
    }

    return <ReservationList list={reservations ?? []} />;
  };

  return (
    <div className="flex flex-col justify-between min-h-[calc(100vh-64px)]">
      <div>
        <div className="pt-8 px-8">
          <MyPageHeader />
          <h2 className=" text-xl font-bold mb-4">예약 내역</h2>
        </div>
        {renderContent()}
      </div>
      <div>
        <Footer />
        <Toaster />
      </div>
    </div>
  );
};

export default ReservationListPage;
