// TODO: 임의로 정한 경로이기 떄문에 회의 후 정 계획
export const PATH = {
  login: "/",

  // auth
  signUp: "/sign-up",
  logout: "/logout",
  oauthRedirect: "/oauth-redirect",
  mypage: "/mypage",
  reservedList: "/mypage/reserved-list",
  designerList: "/designer-list",
  designerDetail: (id: string) => `/mypage/designer/${id}`,
};
