// TODO: 임의로 정한 경로이기 떄문에 회의 후 정 계획
export const PATH = {
  login: "/login",
  logout: "/logout",

  designerList: "/designer-list",
  designerDetail: (id: string) => `/designer/${id}`,

  reservationList: "/reservation-list",
  reservationDetail: (id: string) => `/reservation/${id}`,
  reservationDetailPath: "/reservation/:id",

  payments: "/payment", // 결제 페이지
  paymentSuccess: "/payment/success", // 결제 성공 페이지
  paymentPrepare: "/payment-prepare",  // 임시 결제 준비 페이지
  paymentBankTransfer: "/payment/bank-transfer", // 계좌이체 결제 페이지

  mypage: "/mypage",
  

} as const;
