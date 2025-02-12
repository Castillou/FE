import { Reservation } from "@/types/apiTypes";

const ReservationItem = ({ reservationData }: { reservationData: Reservation }) => {
  return (
    <div>
      <div className="w-[80%] h-[310px] bg-gray-500 rounded-md m-auto my-8 text-center">
        {reservationData.id}
        <p>30분 이내 예약 내역</p>
      </div>
    </div>
  );
};

export default ReservationItem;
