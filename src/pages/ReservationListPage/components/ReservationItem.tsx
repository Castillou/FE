import { getDesignerDetail } from "@/apis/designerDetail";
import { PATH } from "@/constants/path";
import QUERY_KEY from "@/constants/queryKey";
import { Reservation } from "@/types/apiTypes";
import { formatReservationDate } from "@/utils/dayFormat";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

interface ReservationItemProps {
  reservation: Reservation;
}

const DesignerItem = ({ reservation }: ReservationItemProps) => {
  const navigate = useNavigate();

  // 디자이너 정보를 useQuery로 불러오기
  const {
    data: designer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: QUERY_KEY.designer.detail(reservation.designer_id),
    queryFn: () => getDesignerDetail(reservation.designer_id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });

  // 예약 상세 페이지로 이동
  const handleClick = () => {
    navigate(PATH.reservationDetail(reservation.id));
  };

  // 로딩 상태 표시
  if (isLoading) {
    return <li className="px-6 py-4 bg-gray-scale-100 rounded-xl">로딩 중...</li>;
  }

  // 에러 상태 표시
  if (isError) {
    return (
      <li className="px-6 py-4 bg-gray-scale-100 rounded-xl text-red-500">
        {error.message || "디자이너 정보를 불러오는 데 실패했습니다."}
      </li>
    );
  }

  const getStatusClassName = (isPastReservation: boolean, status: string) => {
    if (isPastReservation && status === "예약완료") {
      return "px-3 py-1 rounded-full block text-body2 bg-green-500/20";
    }
    if (status === "예약완료") {
      return "px-3 py-1 rounded-full block text-body2 bg-info-500/20";
    }
    if (status === "결제대기") {
      return "px-3 py-1 rounded-full block text-body2 bg-yellow-500/20";
    }
    return "px-3 py-1 rounded-full block text-body2 bg-red-500/20";
  };

  // 예약 시간이 지났는지 확인
  const isPastReservation = dayjs(reservation.reservation_date_time).isBefore(dayjs());

  return (
    <li onClick={handleClick} className="px-6 py-4 bg-gray-scale-100 rounded-xl">
      <article className="flex mb-1 items-center justify-between">
        <h3 className="text-body1 font-bold">
          {designer ? `${designer.name}` : "디자이너 정보 없음"}
        </h3>
        <div className="flex gap-2">
          <span className="bg-white px-3 py-1 rounded-full block text-body2">
            {reservation.mode}
          </span>
          <span className={getStatusClassName(isPastReservation, reservation.status)}>
            {isPastReservation && reservation.status === "예약완료"
              ? "이용완료"
              : reservation.status}
          </span>
        </div>
      </article>
      <span className="block text-body1 font-semibold text-gray-scale-500">
        {Intl.NumberFormat("ko-KR").format(reservation.consulting_fee)}원
      </span>
      <span className="text-body2 font-light text-gray-scale-300">
        {formatReservationDate(reservation.reservation_date_time)}
      </span>
    </li>
  );
};

export default DesignerItem;
