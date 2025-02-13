import { PATH } from "@/constants/path";
import { LoginPage, AuthSuccessPage, AuthErrorPage } from "@/pages";

const LOGIN_ROUTES = [
  {
    path: PATH.login,
    element: <LoginPage />,
  },
  // {
  //   path: PATH.authCallback,
  //   element: <CallbackPage />,
  // },
  {
    path: PATH.authSuccess,
    element: <AuthSuccessPage />,
  },

  {
    path: PATH.authError,
    element: <AuthErrorPage />,
  },
];

export default LOGIN_ROUTES;
