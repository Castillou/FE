import Header from "@/components/common/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="w-[393px] min-h-dvh m-auto bg-gray-50">
      <div className="font-sans">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
