import RootLayout from "@/layouts/RootLayout";
import HomeLayout from "@/layouts/HomeLayout";
import { createBrowserRouter } from "react-router-dom";
import { ErrorPage } from "@/pages";
import {
  LOGIN_ROUTES,
  DESIGNER_ROUTES,
  PAYMENTS_ROUTES,
  RESERVATION_ROUTES,
  MYPAGE_ROUTES,
} from "./route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...LOGIN_ROUTES,
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            path: "/",
            children: [
              ...DESIGNER_ROUTES,
              ...PAYMENTS_ROUTES,
              ...RESERVATION_ROUTES,
              ...MYPAGE_ROUTES,
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
