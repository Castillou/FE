import { ReservationUpdateResponse } from "@/types/reservation";
import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const reservationCancel = async (
  reservation_id: string
): Promise<ReservationUpdateResponse> => {
  try {
    const response = await devApi.patch(RESERVATION_ENDPOINT.cancel(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error + "예약 취소 중 오류가 발생했습니다.");
  }
};
