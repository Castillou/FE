import dayjs from "dayjs";

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
