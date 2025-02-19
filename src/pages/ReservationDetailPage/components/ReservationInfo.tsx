import { reservationCancel } from "@/apis/reservationCancel";
import { getGoogleMeetLink } from "@/apis/generateGoogleMeet";
import { PATH } from "@/constants/path";
import { cn } from "@/lib/utils";
import { DesignerDetailResponse, Reservation } from "@/types/apiTypes";
import { formatReservationDate, isWithin30Minutes } from "@/utils/dayFormat";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import QUERY_KEY from "@/constants/queryKey";

interface ReservationInfoProps {
  reservation: Reservation;
  designer: DesignerDetailResponse;
}

const ReservationInfo = ({ reservation, designer }: ReservationInfoProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [googleMeetLink, setGoogleMeetLink] = useState<string | null>(null);

  // 예약 시간이 30분 이내인지 확인하고 구글 미트 링크를 가져오는 로직
  useEffect(() => {
    const fetchGoogleMeetLink = async () => {
      if (isWithin30Minutes(reservation.reservation_date_time)) {
        const response = await getGoogleMeetLink(reservation.id);
        setGoogleMeetLink(response.google_meet_link);
      }
    };

    fetchGoogleMeetLink();
  }, [reservation.reservation_date_time, reservation.id]);

  // 예약 시간이 지났는지 확인
  const isPastReservation = dayjs(reservation.reservation_date_time).isBefore(dayjs());

  // "재예약" 상태인지 확인 (예약 취소 또는 이용 완료)
  const isReReservation = reservation.status === "예약취소" || isPastReservation;

  // 예약 취소 처리
  const handleCancelReservation = async () => {
    try {
      await reservationCancel(reservation.id);

      // 모든 예약 관련 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.reservationList.all,
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.reservationList.all,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.reservationList.detail(reservation.id),
        exact: false,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.reservationList.detail(reservation.id),
      });

      alert("예약이 취소되었습니다.");
      navigate(PATH.reservationList);
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
    }
  };

  // 재예약 처리
  const handleReReservation = async () => {
    navigate(PATH.designerDetail(reservation.designer_id));
  };

  return (
    <section className="flex flex-col justify-between">
      <article className="flex mb-4 items-center justify-between">
        <h3 className="text-xl font-bold">{designer?.name}</h3>
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
              isPastReservation
                ? "bg-green-500/20 text-body2" // 지난 예약은 초록색 배경
                : reservation.status === "예약완료"
                ? "bg-info-500/20 text-body2"
                : "bg-red-500/20 text-body2"
            )}
          >
            {isPastReservation ? "이용 완료" : reservation.status}
          </span>
        </div>

        <span className="block text-sub-title font-semibold text-gray-scale-500">
          {Intl.NumberFormat("ko-KR").format(reservation.consulting_fee)}원
        </span>
      </article>
      <div className="border border-gray-scale-200 rounded text-sm text-gray-scale-400 p-2 mb-3 text-center">
        {!isReReservation && reservation.mode === "대면" && designer?.shop_address}
        {!isReReservation &&
          reservation.mode === "비대면" &&
          (isWithin30Minutes(reservation.reservation_date_time)
            ? googleMeetLink || "구글 미트 링크를 생성 중입니다..."
            : "구글 미트 링크는 30분 전에 생성됩니다.")}
        {isReReservation && "이용이 완료되었습니다."}
      </div>

      {/* 재예약 상태인 경우 재예약 버튼 표시, 그렇지 않으면 예약 취소 버튼 표시 */}
      {isReReservation ? (
        <button
          onClick={handleReReservation}
          className="w-full bg-purple-500 py-3 text-body1 text-white rounded-lg"
        >
          재예약
        </button>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-gray-scale-200 py-3 text-body1 text-gray-scale-100 rounded-lg">
              예약 취소
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                <div className="w-full flex justify-center pt-6 mb-4">
                  <div className="w-28 h-28 text-title text-purple-500 bg-purple-100 rounded-full flex items-center justify-center">
                    !
                  </div>
                </div>
              </DialogTitle>
              <DialogDescription className="text-center text-body1 mb-3">
                정말로 예약을 취소하시겠습니까?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={handleCancelReservation}
                className="w-24 bg-gray-scale-100 py-2 text-sub-body1 text-gray-scale-400 rounded-lg"
              >
                네
              </button>
              <DialogClose className="w-24  py-2 text-sub-body1 bg-purple-500 text-purple-100 rounded-lg">
                아니오
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default ReservationInfo;
