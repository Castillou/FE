const DESIGNER = {
  list: ["designerList"],
};

const RESERVATION = {
  list: (user_id: string) => ["reservationList", { user_id }],
  detail: (reservation_id: string) => ["reservationDetail", { reservation_id }],
};

const QUERY_KEY = {
  designer: DESIGNER,
  reservationList: RESERVATION,
};

export default QUERY_KEY;
