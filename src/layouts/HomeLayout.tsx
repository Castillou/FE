import Footer from "@/components/common/Footer";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-w-[375px] max-w-[430px] min-h-dvh m-auto bg-gray-50">
      <div className="font-sans">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
