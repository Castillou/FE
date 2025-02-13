import { getReservationDetail } from "@/apis/reservationDetail";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import ReservationInfo from "./components/ReservationInfo";
import ImageSection from "./components/ImageSection";
import { useParams } from "react-router-dom";
import { Reservation } from "@/types/apiTypes";

const ReservationDetailContent = ({
  data,
  isPending,
  isError,
}: {
  data: Reservation | undefined;
  isPending: boolean;
  isError: boolean;
}) => {
  if (isPending) {
    return <div className="px-5">Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <h2>데이터를 불러오지 못했습니다.</h2>
        <p>예약 상세 정보를 불러오지 못했습니다. 잠시 후에 다시 시도해주세요.</p>
      </div>
    );
  }

  if (data) {
    return (
      <>
        <ImageSection />
        <ReservationInfo reservation={data} />
      </>
    );
  }

  return null;
};

const ReservationDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isPending, isError } = useQuery({
    queryKey: QUERY_KEY.reservationList.detail(id as string),
    queryFn: () => getReservationDetail(id as string),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return (
    <div className="pb-24">
      <h2 className="pt-4 px-5 text-xl font-bold mb-4">예약 상세정보</h2>
      <ReservationDetailContent data={data} isPending={isPending} isError={isError} />
    </div>
  );
};

export default ReservationDetailPage;
