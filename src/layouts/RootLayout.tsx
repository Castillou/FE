import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="min-w-[350px] max-w-[450px] min-h-dvh m-auto">
      <div className="font-sans">
        <Outlet />
      </div>
    </div>
  );
}
