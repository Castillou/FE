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
import ScrollToTop from "@/components/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ScrollToTop>
        <RootLayout />
      </ScrollToTop>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        children: LOGIN_ROUTES,
      },
      {
        path: "",
        element: <HomeLayout noFooter={location.pathname.includes("/designer/")} />,
        children: [...DESIGNER_ROUTES, ...PAYMENTS_ROUTES, ...RESERVATION_ROUTES, ...MYPAGE_ROUTES],
      },
    ],
  },
]);

export default router;
