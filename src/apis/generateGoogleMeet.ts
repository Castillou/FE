import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getGoogleMeetLink = async (reservation_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.generateGoogleMeet(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
