import { getReservationDetail } from "@/apis/reservationDetail";
import Footer from "@/components/common/Footer";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import ReservationInfo from "./components/ReservationInfo";
import ImageSection from "./components/ImageSection";

const reservation_id = "67ab4a87e38533dcf975950f";

const ReservationDetailPage = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: QUERY_KEY.reservationList.detail(reservation_id),
    queryFn: () => getReservationDetail(reservation_id),
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

  if (data) {
    content = (
      <>
        <ImageSection />
        <ReservationInfo reservation={data} />
      </>
    );
  }

  return (
    <div className="pb-24">
      <h2 className="pt-4 px-5 text-xl font-bold mb-4">예약 상세정보</h2>
      {content}
      <Footer />
    </div>
  );
};

export default ReservationDetailPage;
