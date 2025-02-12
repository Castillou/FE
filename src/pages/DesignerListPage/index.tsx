import { getDesignerList } from "@/apis/designerList";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import DesignerList from "./components/DesignerList";
import { getReservationList } from "@/apis/reservation";
import { useMemo } from "react";
import { Reservation } from "@/types/apiTypes";
import dayjs from "dayjs";
import ReservationItem from "./components/ReservationItem";
import { formatDate } from "@/utils/dayFormat";

const DesignerListPage = () => {
  const { data: designerData, isPending: designerPending } = useQuery({
    queryKey: QUERY_KEY.designer.list,
    queryFn: getDesignerList,
  });

  const user_id = "67ab499ba706f516fb348ddd";

  const { data: reservationsData, isPending: reservationPending } = useQuery({
    queryKey: QUERY_KEY.reservationList.list(user_id),
    queryFn: () => getReservationList(user_id),
  });

  const upcomingReservations = useMemo(() => {
    if (!reservationsData) return [];

    const now = dayjs("2025-04-20 12:01");

    const thirtyMinutesLater = now.add(30, "minute");

    return reservationsData.filter((reservation: Reservation) => {
      const reservationTime = formatDate(reservation.reservation_date_time);

      return (
        reservation.status !== "예약취소" && // 취소된 예약 제외
        reservationTime.isAfter(now) && // 현재 시간 이후
        reservationTime.isBefore(thirtyMinutesLater) // 30분 이내
      );
    });
  }, [reservationsData]);

  return (
    <>
      {reservationPending && <div>Loading...</div>}
      {upcomingReservations.length === 0 && <div>30분 이내 예약 없음</div>}
      {upcomingReservations.length > 0 && (
        <ReservationItem reservationData={upcomingReservations[0]}></ReservationItem>
      )}

      <div>
        {designerPending ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full p-1">
            <DesignerList designers={designerData} />
          </div>
        )}
      </div>
    </>
  );
};

export default DesignerListPage;
