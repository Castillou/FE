import { User } from "@/types/apiTypes";
import { MYPAGE_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getUserDetail = async () => {
  try {
    const response = await devApi.get<User>(MYPAGE_ENDPOINT.me);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
