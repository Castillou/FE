import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";
import { ReservationDetailResponse } from "@/types/reservation";

export const getReservationDetail = async (
  reservation_id: string
): Promise<ReservationDetailResponse | undefined> => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.get_detail(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
