import { RESERVATION_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";
import {
  ReservationCreateRequest,
  ReservationCreateResponse,
  ReservationUpdateResponse,
} from "@/types/reservation";

export const getReservationList = async (user_id: string | undefined) => {
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

export const updateReservationStatus = async (
  reservation_id: string,
  reservation_status: "이용완료" | "예약취소" | "결제대기"
): Promise<ReservationUpdateResponse> => {
  try {
    const response = await devApi.patch(
      RESERVATION_ENDPOINT.update_reservation_status(reservation_id, reservation_status)
    );
    return response.data;
  } catch (error) {
    throw new Error(error + "예약 상태 업데이트 중 오류가 발생했습니다.");
  }
};
