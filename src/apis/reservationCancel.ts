import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const reservationCancel = async (reservation_id: string) => {
  try {
    const response = await devApi.patch(RESERVATION_ENDPOINT.cancel(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
