import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    <Tabs defaultValue="completed" className="w-full px-4">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="completed">예약완료</TabsTrigger>
        <TabsTrigger value="canceled">예약취소</TabsTrigger>
      </TabsList>

      <TabsContent value="completed">
        <ul className="flex flex-col gap-4">
          {completedReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="canceled">
        <ul className="flex flex-col gap-4">
          {canceledReservations.map((reservation) => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
};

export default ReservationList;
