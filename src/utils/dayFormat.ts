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

// dayjs 객체를 "202509221030" 형식으로 변환
export function formatReverseDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}`;
}

export const isWithin30Minutes = (reservationDateTime: string): boolean => {
  const now = dayjs(); // 현재 시간
  const reservationTime = dayjs(reservationDateTime); // 예약 시간

  // 예약 시간과 현재 시간의 차이를 분 단위로 계산
  const diffInMinutes = reservationTime.diff(now, "minute");

  // 차이가 0 이상이고 30분 이하인지 확인
  return diffInMinutes >= 0 && diffInMinutes <= 30;
};
