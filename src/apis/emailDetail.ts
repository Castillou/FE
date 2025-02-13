import { User } from "@/types/apiTypes";
import { MYPAGE_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getEmailDetail = async (email: string) => {
  try {
    const response = await devApi.get<User>(MYPAGE_ENDPOINT.email(email));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
