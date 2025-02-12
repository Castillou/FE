const DESIGNER = {
  list: ["designerList"],
};

const RESERVATION = {
  list: (user_id: string) => ["reservationList", { user_id }],
};

const QUERY_KEY = {
  designer: DESIGNER,
  reservationList: RESERVATION,
};

export default QUERY_KEY;
