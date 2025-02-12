export interface Designer {
  _id: string;
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
  mode: "대면" | "비대면";
  reservation_date_time: string;
  status: "예약완료" | "예약취소" | "상담완료";
}
