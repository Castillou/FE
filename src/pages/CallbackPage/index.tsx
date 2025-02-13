import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import devApi from "@/config/axiosDevConfig";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");
    const code = queryParams.get("code");

    if (error) {
      navigate("/");
    } else if (code) {
      devApi
        .get("/auth/callback", { params: { code } })
        .then((response) => {
          // 액세스 토큰을 받아서 처리
          const { accessToken } = response.data;
          localStorage.setItem("accessToken", accessToken);
          navigate("/desiger-list");
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
