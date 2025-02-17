import { User } from "@/types/apiTypes";
import { MYPAGE_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getUserDetail = async (): Promise<User> => {
  try {
    const response = await devApi.get<User>(MYPAGE_ENDPOINT.me);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("사용자 정보를 가져오는데 실패하였습니다.");
  }
};
