import { PATH } from "@/constants/path";
import { ReservationListPage, ReservationDetailPage } from "@/pages";

const RESERVATION_ROUTES = [
  {
    path: PATH.reservationList,
    element: <ReservationListPage />,
  },
  {
    path: PATH.reservationDetailPath,
    element: <ReservationDetailPage />,
  },
];

export default RESERVATION_ROUTES;
