export const serverURL = import.meta.env.VITE_API_BASE_URL;
export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ReservationEndpoint {
  list: string;
  get_list: (user_Id: string) => string;
  get_detail: (reservation_Id: string) => string;
  cancel: (reservation_Id: string) => string;
  generateGoogleMeet: (reservation_Id: string) => string;
  create: string;
  update_reservation_status: (
    reservation_id: string,
    reservation_status: "이용완료" | "예약취소" | "결제대기"
  ) => string;
}

interface DesignerEndpoint {
  designers: string;
  get_detail: (designer_id: string) => string;
}

interface MypageEndpoint {
  me: string;
  email: (email: string) => string;
}

/**
# ======================#
|       RESERVATION     |
# ======================#
*/

export const RESERVATION_ENDPOINT: ReservationEndpoint = Object.freeze({
  list: `/reservation/list`, // 디자이너 예약 목록 조회
  get_list: (user_Id: string) => `/reservation/get_list?user_id=${user_Id}`, // 사용자 예약 내역 조회
  get_detail: (reservation_Id: string) =>
    `/reservation/get_detail?reservation_id=${reservation_Id}`, // 예약 상세 정보 조회
  cancel: (reservation_id: string) => `/reservation/cancel?reservation_id=${reservation_id}`, // 예약 취소
  generateGoogleMeet: (reservation_Id: string) =>
    `/reservation/generate_google_meet_link?reservation_id=${reservation_Id}`, // 구글밋 생성
  create: "/reservation/create", // 예약 생성
  update_reservation_status: (
    reservation_id: string,
    reservation_status: "이용완료" | "예약취소" | "결제대기"
  ) =>
    `/reservation/update_reservation_status?reservation_id =${reservation_id}$reservation_status=${reservation_status}`, // 예약 상태 업데이트
});

/**
# ======================#
|        DESIGNER       |
# ======================#
*/

export const DESIGNER_ENDPOINT: DesignerEndpoint = Object.freeze({
  designers: `/designers`,
  get_detail: (designer_id: string) => `/designers/${designer_id}`, // 디자이너 상세 정보 조회
});

/**
# ======================#
|         MYPAGE        |
# ======================#
*/

export const MYPAGE_ENDPOINT: MypageEndpoint = Object.freeze({
  me: "/user/me",
  email: (email: string) => `/user/${email}`,
  delete: "/user/delete",
});
