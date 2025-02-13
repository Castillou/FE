// TODO: 임의로 정한 경로이기 떄문에 회의 후 정 계획
export const PATH = {
  login: "/",
  logout: "/logout",
  // authCallback: "/auth/callback",
  authSuccess: "/success",
  authError: "/error",

  designerList: "/designer-list",
  designerDetail: (id: string) => `/designer/${id}`,

  reservationList: "/reservation-list",
  reservationDetail: (id: string) => `/reservation/${id}`,
  reservationDetailPath: "/reservation/:id",

  payments: "/payments",

  mypage: "/mypage",
};
