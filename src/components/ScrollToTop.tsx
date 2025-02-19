import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { userLogout } from "@/apis/userLogout";
import devApi from "@/config/axiosDevConfig";

export default function ScrollToTop({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const refreshAccessToken = async () => {
    try {
      const response = await devApi.post("/auth/refresh");
      const newAccessToken = response.data;
      // 새로 받은 access token을 쿠키에 저장
      Cookies.set("access_token", newAccessToken);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    // 페이지 최상단으로 스크롤
    window.scrollTo(0, 0);

    const checkAuth = async () => {
      const accessToken = Cookies.get("access_token");

      if (!accessToken && pathname !== "/login") {
        // access token이 없을 경우 refresh 시도
        const refreshSuccess = await refreshAccessToken();

        // refresh 실패시 로그인 페이지로 리다이렉트
        if (!refreshSuccess) {
          await userLogout();
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [pathname, navigate]);

  return <>{children}</>;
}
