import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import { HOME_ROUTES } from "./route";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // loader: tokenLoader,
    errorElement: <p style={{ textAlign: "center" }}>404</p>,
    children: [...HOME_ROUTES],
  },
]);

export default router;
