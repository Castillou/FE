import { cn } from "@/lib/utils";
import { Reservation } from "@/types/apiTypes";
import { formatReservationDate } from "@/utils/dayFormat";

interface ReservationItemProps {
  reservation: Reservation;
}

const DesignerItem = ({ reservation }: ReservationItemProps) => {
  return (
    <li className="px-6 py-4 bg-gray-scale-100 rounded-xl">
      <article className="flex mb-1 items-center justify-between">
        <h3 className="text-body1 font-bold">이초 디자이너</h3>
        <div className="flex gap-2">
          <span className="bg-white px-3 py-1 rounded-full block text-body2">
            {reservation.mode}
          </span>
          <span
            className={cn(
              "bg-white px-3 py-1 rounded-full block text-body2", // 기본 스타일
              reservation.status === "예약완료"
                ? "bg-info-500/20 text-body2"
                : "bg-red-500/20 text-body2"
            )}
          >
            {reservation.status}
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
