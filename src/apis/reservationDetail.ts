import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getReservationDetail = async (reservation_id: string) => {
  try {
    const response = await devApi.get(RESERVATION_ENDPOINT.get_detail(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
