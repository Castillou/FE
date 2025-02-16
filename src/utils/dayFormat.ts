import dayjs from "dayjs";
import "dayjs/locale/ko";
import weekday from "dayjs/plugin/weekday";

dayjs.extend(weekday);
dayjs.locale("ko");

export const formatReservationDate = (dateString: string) => {
  return dayjs(dateString).format("YYYY.MM.DD(ddd) HH:mm"); // 형식: 2025.04.20(금) 12:30
};

// "202509221030" 형식을 dayjs 객체로 변환
export const formatDate = (date: string) => {
  const formattedData = dayjs(
    `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)} ${date.slice(8, 10)}:${date.slice(
      10,
      12
    )}`
  );

  return formattedData;
};

export const isWithin30Minutes = (reservationDateTime: string): boolean => {
  const now = dayjs(); // 현재 시간
  const reservationTime = dayjs(reservationDateTime); // 예약 시간

  // 예약 시간과 현재 시간의 차이를 분 단위로 계산
  const diffInMinutes = reservationTime.diff(now, "minute");

  // 차이가 0 이상이고 30분 이하인지 확인
  return diffInMinutes >= 0 && diffInMinutes <= 30;
};
