import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <div>인증 중 오류가 발생했습니다. 홈으로 이동합니다...</div>;
};

export default AuthErrorPage;
