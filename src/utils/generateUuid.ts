import { v4 as uuidv4 } from "uuid";

export function generateShortUuid(length: number = 24): string {
  const fullUuid = uuidv4().replace(/-/g, ""); // 하이픈 제거
  return fullUuid.slice(0, length); // 원하는 길이로 자르기
}
