import { Reservation } from "@/types/apiTypes";
import ReservationItem from "./ReservationItem";

interface ReservationListProps {
  list: Reservation[];
}

const ReservationList = ({ list }: ReservationListProps) => {
  // 1. "예약완료" 상태의 예약만 필터링
  const completedReservations = list.filter((reservation) => reservation.status === "예약완료");

  // 2. "예약취소" 상태의 예약만 필터링
  const canceledReservations = list.filter((reservation) => reservation.status === "예약취소");

  return (
    <div className="flex flex-col gap-8 px-4">
      {/* 예약완료 리스트 */}
      <div>
        <h2 className="text-md font-semibold pl-2 text-gray-scale-400 mb-3">예약완료</h2>
        <ul className="flex flex-col gap-4">
          {completedReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>

      {/* 예약취소 리스트 */}
      <div>
        <h2 className="text-md font-semibold pl-2 text-gray-scale-400 mb-3">예약취소</h2>
        <ul className="flex flex-col gap-4">
          {canceledReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReservationList;
