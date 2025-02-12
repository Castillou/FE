// TODO: 임의로 정한 경로이기 떄문에 회의 후 정 계획
export const PATH = {
  login: "/",

  // auth
  signUp: "/sign-up",
  logout: "/logout",
  oauthRedirect: "/oauth-redirect",
  reservationList: "/reservation-list",
  designerList: "/designer-list",
  payments: "/payments",
  designerDetail: (id: string) => `/designer/${id}`,
  reservationDetail: (id: string) => `/reservation/${id}`,
  reservationDetailPath: "/reservation/:id",
};
