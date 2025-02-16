import { FilterOptions } from "@/types/types";

const DESIGNER = {
  list: (filterOptions: FilterOptions) => ["designerList", { filterOptions }],
  detail: (designer_id: string) => ["designerDetail", designer_id],
};

const RESERVATION = {
  list: (user_id: string) => ["reservationList", { user_id }],
  detail: (reservation_id: string) => ["reservationDetail", { reservation_id }],
};

const USER = {
  email: (email: string) => ["user", { email }],
};

const QUERY_KEY = {
  designer: DESIGNER,
  reservationList: RESERVATION,
  user: USER,
};

export default QUERY_KEY;
