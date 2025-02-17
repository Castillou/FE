import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";
import { ReservationCreateRequest, ReservationCreateResponse } from "@/types/reservation";

export const getReservationList = async (user_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.get_list(user_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const ReservationList = async (designer_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.list, {
      designer_id: designer_id,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const ReservationCreate = async (
  payload: ReservationCreateRequest
): Promise<ReservationCreateResponse> => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.create, payload);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
