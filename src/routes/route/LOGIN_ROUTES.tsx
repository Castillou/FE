import { PATH } from "@/constants/path";
import { LoginPage } from "@/pages";

const LOGIN_ROUTES = [
  {
    index: true,
    element: <LoginPage />,
  },
  {
    path: PATH.login,
    element: <LoginPage />,
  },
];

export default LOGIN_ROUTES;
