import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReservationPrepareHeader from "./components/ReservationPrepareHeader";
import { ReservationList } from "@/apis/reservation";
import dayjs from "dayjs";
import { DesignerReservationList } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

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
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [reservationList, setReservationList] = useState<DesignerReservationList[]>([]);
  const { state } = useLocation();
  const reservationData = state.reservationData;
  const navigate = useNavigate();

  const servicePrice =
    reservationData?.selectedMode === "대면"
      ? reservationData?.face_consulting_fee
      : reservationData?.non_face_consulting_fee;

  const getDisabledTimes = () => {
    if (!date) return [];

    const now = dayjs();
    const isToday = dayjs(date).isSame(now, "day");

    return reservationList
      .filter(
        (reservation) =>
          reservation.status === "예약완료" &&
          dayjs(reservation.reservation_date_time).format("YYYY-MM-DD") ===
            dayjs(date).format("YYYY-MM-DD")
      )
      .map((reservation) => dayjs(reservation.reservation_date_time).format("HH:mm"))
      .concat(
        // 오늘 날짜인 경우에만 현재 시간 이전의 시간들을 disabled 처리
        isToday
          ? Array.from({ length: 48 }, (_, i) => {
              const hour = Math.floor(i / 2);
              const minute = i % 2 === 0 ? "00" : "30";
              return `${String(hour).padStart(2, "0")}:${minute}`;
            }).filter((time) => dayjs(`${dayjs(date).format("YYYY-MM-DD")} ${time}`).isBefore(now))
          : []
      );
  };

  const disabledTimes = getDisabledTimes();

  const navigatePaymentPage = () => {
    if (!date || !selectedTime) return;

    // 시간 형식 변환 - 예: "1:00" -> "13:00" 등과 같이 12시간제를 24시간제로 변환
    let formattedTime = selectedTime;
    if (
      selectedTime.includes(":") &&
      !selectedTime.startsWith("10") &&
      !selectedTime.startsWith("11") &&
      !selectedTime.startsWith("12")
    ) {
      const [hour, minute] = selectedTime.split(":");
      const hourNum = parseInt(hour);
      if (hourNum < 10) {
        // 오후 시간대 (1시~9시)는 12를 더해 24시간제로 변환
        formattedTime = `${hourNum + 12}:${minute}`;
      }
    }

    // 날짜와 시간 합치기
    const selectedDateTime = dayjs(date)
      .set("hour", parseInt(formattedTime.split(":")[0]))
      .set("minute", parseInt(formattedTime.split(":")[1]))
      .toDate();

    navigate(PATH.payments, {
      state: {
        reservationData: reservationData,
        servicePrice: servicePrice,
        selectedDateTime: selectedDateTime, // 날짜와 시간이 결합된 Date 객체
      },
    });
  };

  useEffect(() => {
    const fetchReservationList = async () => {
      const response = await ReservationList(reservationData.id);
      setReservationList(response.reservation_list);
    };

    fetchReservationList();
  }, [reservationData]);

  return (
    <div className="pt-8 px-8">
      <ReservationPrepareHeader />
      <section>
        <h3 className="text-sub-title font-bold mb-3">{reservationData?.name}</h3>
        <p className="flex">
          <span className="w-24 text-body1 text-gray-400 mb-2">컨설팅 방식</span>
          <span>{reservationData?.selectedMode}</span>
        </p>
        <p className="flex">
          <span className="w-24 text-body1 text-gray-400">가격</span>
          <span>{Intl.NumberFormat("ko-KR").format(Number(servicePrice))}원</span>
        </p>
      </section>

      <hr className="my-5" />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">날짜와 시간을 선택해주세요.</h2>
        </div>

        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={(date) => date < dayjs().startOf("day").toDate()}
          className="w-full"
        />

        <hr className="my-5" />

        <div>
          <div className="space-y-4">
            {timeSlots.map((period) => (
              <div key={period.label} className="space-y-3">
                <h4 className="text-sm text-body1">{period.label}</h4>
                <div className="grid grid-cols-4 gap-2">
                  {period.slots.map((time) => (
                    <button
                      key={time}
                      className={cn(
                        "h-10 rounded-xl bg-[#F4F4F4] text-gray-scale-400",
                        selectedTime === time && "bg-[#D896FF] text-white",
                        disabledTimes.includes(time) &&
                          "text-gray-300 line-through cursor-not-allowed"
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
          className="w-full mt-8 py-2 bg-[#D896FF] text-white rounded-lg"
          onClick={navigatePaymentPage}
        >
          다음
        </button>
      ) : (
        <button className="w-full mt-8 py-2 bg-gray-300 text-gray-500 rounded-lg" disabled>
          다음
        </button>
      )}
    </div>
  );
};

export default ReservationPrepare;
