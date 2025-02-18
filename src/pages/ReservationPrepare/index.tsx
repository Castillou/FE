import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import ReservationPrepareHeader from "./components/ReservationPrepareHeader";
import { ReservationList } from "@/apis/reservation";
import dayjs from "dayjs";
import { DesignerReservationList } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { ReservationData } from "@/types/types";

const timeSlots = [
  { label: "오전", slots: ["10:00", "10:30", "11:00", "11:30"] },
  {
    label: "오후",
    slots: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
    ],
  },
];

const ReservationPrepare = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>();
  const [reservationList, setReservationList] = useState<DesignerReservationList[]>([]);
  const { state } = useLocation();
  const reservationData: ReservationData = state.reservationData;
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const servicePrice =
    reservationData?.selectedMode === "대면"
      ? reservationData?.face_consulting_fee
      : reservationData?.non_face_consulting_fee;

  function formatTo12Hour(time: string) {
    const [hour, minute] = time.split(":").map(Number);
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${String(formattedHour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  // 현재 시간 이전의 시간을 disabled 처리하는 함수
  const getDisabledTimes = () => {
    if (!date) return [];

    const now = dayjs(); // 현재 시간
    const isToday = dayjs(date).isSame(now, "day"); // 선택한 날짜가 오늘인지 확인

    // 이미 예약된 시간 목록
    const reservedTimes = reservationList
      .filter(
        (reservation) =>
          reservation.status === "예약완료" &&
          dayjs(reservation.reservation_date_time).format("YYYY-MM-DD") ===
            dayjs(date).format("YYYY-MM-DD")
      )
      .map((reservation) => dayjs(reservation.reservation_date_time).format("HH:mm"));

    // 오늘 날짜인 경우 현재 시간 이전의 시간을 disabled 처리
    const disabledTimes = isToday
      ? timeSlots
          .flatMap((slot) => slot.slots)
          .filter((time) => {
            const timeToCheck = dayjs(`${dayjs(date).format("YYYY-MM-DD")} ${time}`);

            const nextTimeToCheck = now.add(30, "minutes").startOf("hour").add(30, "minutes");
            return timeToCheck.isBefore(nextTimeToCheck); // 현재 시간 + 30분 이전인지 확인
          })
      : [];

    return [...reservedTimes, ...disabledTimes];
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
        ...reservationData,
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
                        "h-10 rounded-xl bg-[#F4F4F4] text-gray-scale-400 text-[14px]",
                        selectedTime === time && "bg-[#D896FF] text-white",
                        disabledTimes.includes(time) &&
                          "text-gray-300 line-through cursor-not-allowed"
                      )}
                      onClick={() => !disabledTimes.includes(time) && setSelectedTime(time)}
                      disabled={disabledTimes.includes(time)}
                    >
                      {formatTo12Hour(time)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <label
        className={cn(
          "border rounded-lg p-3 mt-[36px] mb-2 flex items-center justify-between cursor-pointer",
          isChecked ? "border-primary-100" : "border-gray-300"
        )}
      >
        <p>
          당일 예약은 취소가 불가능합니다. <span className="text-primary-100">(필수)</span>
        </p>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          className="w-4 h-4 accent-primary-100 rounded-xl"
        />
      </label>

      {selectedTime && isChecked ? (
        <button
          className="w-full py-2 bg-[#D896FF] text-white rounded-lg"
          onClick={navigatePaymentPage}
        >
          다음
        </button>
      ) : (
        <button className="w-full py-2 bg-gray-300 text-gray-500 rounded-lg" disabled>
          다음
        </button>
      )}
    </div>
  );
};

export default ReservationPrepare;
