
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