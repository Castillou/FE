import devApi from "@/config/axiosDevConfig";
import { MYPAGE_ENDPOINT } from "./endpoints";
import { UserMeResponse } from "@/types/user";

export const getUserMe = async (): Promise<UserMeResponse> => {
  try {
    const response = await devApi.get(MYPAGE_ENDPOINT.me);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
