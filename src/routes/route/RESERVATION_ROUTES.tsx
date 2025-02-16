import { PATH } from "@/constants/path";
import { ReservationListPage, ReservationDetailPage, ReservationPrepare } from "@/pages";

const RESERVATION_ROUTES = [
  {
    path: PATH.reservationList,
    element: <ReservationListPage />,
  },
  {
    path: PATH.reservationDetailPath,
    element: <ReservationDetailPage />,
  },
  {
    path: PATH.reservationPreparePath,
    element: <ReservationPrepare />,
  },
];

export default RESERVATION_ROUTES;
