import { PATH } from "@/constants/path";
import ReservationListPage from "@/pages/ReservationListPage";

const RESERVATION_ROUTES = [
  {
    path: PATH.reservationList,
    element: <ReservationListPage />,
  },
];

export default RESERVATION_ROUTES;
