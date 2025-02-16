import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReservationPrepareHeader from "./components/ReservationPrepareHeader";

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
          disabled={(date) => date < new Date()}
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
                        selectedTime === time && "bg-purple-400 text-purple-50"
                      )}
                      onClick={() => setSelectedTime(time)}
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

      <button className="w-full py-2 bg-purple-500 text-purple-50 rounded-lg">예약하기</button>
    </div>
  );
};

export default ReservationPrepare;
