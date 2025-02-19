import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";
import { ReservationCreateRequest, ReservationCreateResponse } from "@/types/reservation";

export const getReservationList = async (user_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.get_list(user_id));
    return response.data;
  } catch (error) {
    throw new Error(error + "예약 목록 조회 중 오류가 발생했습니다.");
  }
};

export const ReservationList = async (designer_id: string) => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.list, {
      designer_id: designer_id,
    });
    return response.data;
  } catch (error) {
    throw new Error(error + "디자이너의 예약 목록 조회 중 오류가 발생했습니다.");
  }
};

export const ReservationCreate = async (
  payload: ReservationCreateRequest
): Promise<ReservationCreateResponse> => {
  try {
    const response = await devApi.post(RESERVATION_ENDPOINT.create, payload);
    return response.data;
  } catch (error) {
    throw new Error(error + "예약 생성 중 오류가 발생했습니다.");
  }
};
