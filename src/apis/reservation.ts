import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getReservationList = async (user_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.get_list(user_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
