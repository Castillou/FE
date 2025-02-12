import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const error = queryParams.get("error");

    if (error) {
      // 모든 에러에 대해 /로 리디렉션
      navigate("/");
    }
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
};

export default CallbackPage;
