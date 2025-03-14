export interface Designer {
  id: string;
  name: string;
  region: string;
  specialties: string;
  introduction: string;
  profile_image: string;
  available_modes: string;
  created_at: string;
  face_consulting_fee: number;
  shop_address: string;
  non_face_consulting_fee: number;
  updated_at: string;
}

export interface Reservation {
  id: string;
  designer_id: string;
  user_id: string;
  consulting_fee: number;
  google_meet_link?: string | null;
  mode: "대면" | "비대면";
  reservation_date_time: string;
  status: "예약완료" | "예약취소" | "결제대기";
}

export interface User {
  email: string;
  google_id: string;
  name: string;
  profile_image: string;
  provider: string;
  status: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export interface DesignerReservationList {
  reservation_date_time: string;
  consulting_fee: number;
  mode: string;
  status: string;
}

export interface DesignerDetailResponse {
  id: string;
  name: string;
  region: string;
  shop_address: string;
  profile_image: string;
  specialties: string;
  face_consulting_fee: number;
  non_face_consulting_fee: number;
  introduction: string;
  available_modes: string;
}
