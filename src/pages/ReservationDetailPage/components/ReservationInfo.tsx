import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Reservation } from "@/types/apiTypes";
import { formatReservationDate } from "@/utils/dayFormat";

interface ReservationInfoProps {
  reservation: Reservation;
}

const ReservationInfo = ({ reservation }: ReservationInfoProps) => {
  return (
    <section className="px-4 flex flex-col justify-between">
      <article className="flex mb-4 items-center justify-between">
        <h3 className="text-xl font-bold">이초 디자이너</h3>
        <span className="text-body2 font-light text-gray-scale-300">
          {formatReservationDate(reservation.reservation_date_time)}
        </span>
      </article>
      <article className="flex items-end justify-between mb-6">
        <div className="flex gap-2">
          <span className="bg-gray-scale-100 px-3 py-1 rounded-full block text-body2">
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

        <span className="block text-sub-title font-semibold text-gray-scale-500">
          {Intl.NumberFormat("ko-KR").format(reservation.consulting_fee)}원
        </span>
      </article>
      <div className="border border-gray-scale-200 rounded text-sm text-gray-scale-400 p-2 mb-2 text-center">
        {reservation.google_meet_link || "생성된 구글 미트 링크가 없습니다."}
      </div>
      <Button onClick={() => alert("예약이 취소되었습니다.")}>예약 취소</Button>
    </section>
  );
};

export default ReservationInfo;
