import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reservation } from "@/types/apiTypes";
import ReservationItem from "./ReservationItem";
import dayjs from "dayjs"; // dayjs 라이브러리 사용
import { useEffect } from "react";

import { reservationCancel } from "@/apis/reservationCancel";
interface ReservationListProps {
  list: Reservation[];
}

const ReservationList = ({ list }: ReservationListProps) => {
  // 현재 시간
  const now = dayjs();

  // 컴포넌트 마운트 시 지난 "결제대기" 예약을 "예약취소"로 변경
  useEffect(() => {
    const updateExpiredReservations = async () => {
      const expiredWaitingReservations = list.filter(
        (reservation) =>
          reservation.status === "결제대기" &&
          dayjs(reservation.reservation_date_time).isBefore(now)
      );

      for (const reservation of expiredWaitingReservations) {
        await reservationCancel(reservation.id);
      }
    };

    updateExpiredReservations();
  }, [list, now]);

  // 1. "결제대기" 상태의 예약만 필터링
  const waitingReservations = list.filter((reservation) => reservation.status === "결제대기");

  // 2. "예약완료" 상태이면서 예약 시간이 지나지 않은 예약만 필터링
  const completedReservations = list.filter(
    (reservation) =>
      reservation.status === "예약완료" && dayjs(reservation.reservation_date_time).isAfter(now) // 예약 시간이 현재 시간 이후인지 확인
  );

  // 3. "예약취소" 상태의 예약만 필터링
  const canceledReservations = list.filter((reservation) => reservation.status === "예약취소");

  // 4. "예약완료" 상태이지만 예약 시간이 지난 예약만 필터링
  const pastReservations = list.filter(
    (reservation) =>
      reservation.status === "예약완료" && dayjs(reservation.reservation_date_time).isBefore(now) // 예약 시간이 현재 시간 이전인지 확인
  );

  return (
    <Tabs defaultValue="completed" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-4 mb-4">
        <TabsTrigger value="waiting">결제대기</TabsTrigger>
        <TabsTrigger value="completed">예약완료</TabsTrigger>
        <TabsTrigger value="canceled">예약취소</TabsTrigger>
        <TabsTrigger value="past">지난 예약</TabsTrigger>
      </TabsList>

      {/* 결제대기 탭 */}
      <TabsContent value="waiting">
        <ul className="flex flex-col gap-4">
          {waitingReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>

      {/* 예약완료 탭 */}
      <TabsContent value="completed">
        <ul className="flex flex-col gap-4">
          {completedReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>

      {/* 예약취소 탭 */}
      <TabsContent value="canceled">
        <ul className="flex flex-col gap-4">
          {canceledReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>

      {/* 지난 예약 탭 */}
      <TabsContent value="past">
        <ul className="flex flex-col gap-4">
          {pastReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>

      {list.length === 0 && (
        <div className="text-center text-gray-600">아직 이용한 예약이 없어요!</div>
      )}
    </Tabs>
  );
};

export default ReservationList;
