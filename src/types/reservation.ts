export interface ReservationDetailResponse {
  user_id: string;
  designer_id: string;
  reservation_date_time: string;
  consulting_fee: number;
  google_meet_link: string;
  mode: "대면" | "비대면";
  status: "예약완료" | "예약취소" | "결제대기";
  id: string;
  create_at: string;
  update_at: string;
}
export interface ReservationCreateRequest {
  reservation_id: string;
  designer_id: string;
  user_id: string;
  reservation_date_time: string;
  consulting_fee: string;
  google_meet_link: string;
  mode: string;
  status: string;
}

export interface ReservationCreateResponse {
  user_id: string;
  designer_id: string;
  reservation_date_time: string;
  mode: string;
  status: string;
}
