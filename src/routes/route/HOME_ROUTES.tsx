import { PATH } from "@/constants/path";
import { HomePage } from "@/pages";

const HOME_ROUTES = [
  {
    path: PATH.login,
    element: <HomePage />,
  },
];

export default HOME_ROUTES;
