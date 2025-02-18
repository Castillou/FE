import Footer from "@/components/common/Footer";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Outlet } from "react-router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      gcTime: 1000 * 60 * 60, // 1시간
      refetchOnWindowFocus: false,
    },
  },
});

export default function HomeLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-w-[350px] max-w-[450px] pb-24 min-h-dvh m-auto">
        <div className="font-sans">
          <Outlet />
          <Footer />
        </div>
      </div>
    </QueryClientProvider>
  );
}
