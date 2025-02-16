import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReservationPrepareHeader from "./components/ReservationPrepareHeader";
import { ReservationList } from "@/apis/reservation";
import dayjs from "dayjs";
import { DesignerReservationList } from "@/types/apiTypes";

const timeSlots = [
  { label: "오전", slots: ["10:00", "10:30", "11:00", "11:30"] },
  {
    label: "오후",
    slots: [
      "12:00",
      "12:30",
      "1:00",
      "1:30",
      "2:00",
      "2:30",
      "3:00",
      "3:30",
      "4:00",
      "4:30",
      "5:00",
      "5:30",
      "6:00",
      "6:30",
      "7:00",
    ],
  },
];

const ReservationPrepare = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string>();
  const [reservationList, setReservationList] = React.useState<DesignerReservationList[]>([]);

  const designer_id = "67ab727934cd2146254af06a";

  React.useEffect(() => {
    const fetchReservationList = async () => {
      const response = await ReservationList(designer_id);
      setReservationList(response.reservation_list);
    };

    fetchReservationList();
  }, [designer_id]);

  const getDisabledTimes = () => {
    if (!date) return [];

    return reservationList
      .filter(
        (reservation) =>
          reservation.status === "예약완료" &&
          dayjs(reservation.reservation_date_time).format("YYYY-MM-DD") ===
            dayjs(date).format("YYYY-MM-DD")
      )
      .map((reservation) => dayjs(reservation.reservation_date_time).format("HH:mm"));
  };

  const disabledTimes = getDisabledTimes();

  return (
    <div className="pt-8 px-8 pb-28">
      <ReservationPrepareHeader />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">날짜와 시간을 선택해주세요.</h2>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < dayjs().startOf("day").toDate()}
          className="w-full rounded-md border"
        />

        <div className="py-6">
          <div className="space-y-4">
            {timeSlots.map((period) => (
              <div key={period.label} className="space-y-3">
                <h4 className="text-sm text-body1">{period.label}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {period.slots.map((time) => (
                    <button
                      key={time}
                      className={cn(
                        "h-10 border rounded-md text-gray-scale-400",
                        selectedTime === time && "bg-purple-400 text-purple-50",
                        disabledTimes.includes(time) &&
                          "bg-gray-300 text-gray-500 cursor-not-allowed"
                      )}
                      onClick={() => !disabledTimes.includes(time) && setSelectedTime(time)}
                      disabled={disabledTimes.includes(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTime ? (
        <button
          className="w-full py-2 bg-purple-500 text-purple-50 rounded-lg"
          onClick={() =>
            alert(`${dayjs(date).format("MM월 DD일")}에 ${selectedTime}에 예약했습니다.`)
          }
        >
          예약하기
        </button>
      ) : (
        <button className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg" disabled>
          예약하기
        </button>
      )}
    </div>
  );
};

export default ReservationPrepare;
