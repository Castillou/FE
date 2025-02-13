import { Reservation } from "@/types/apiTypes";

const ReservationItem = ({ reservationData }: { reservationData: Reservation }) => {
  return (
    <div className="px-6">
      <div className="w-full min-h-80 aspect-ratio bg-gray-500 rounded-xl mt-6 mb-4 flex flex-col items-center justify-center">
        <span>{reservationData.id}</span>
        <p>30분 이내 예약 내역</p>
      </div>
    </div>
  );
};

export default ReservationItem;
