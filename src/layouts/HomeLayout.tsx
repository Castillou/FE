import Footer from "@/components/common/Footer";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-w-[350px] max-w-[450px] pb-24 min-h-dvh m-auto">
      <div className="font-sans">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
