import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/designer-list");
    } else {
      navigate("/error");
    }
  }, [navigate, token]);

  return <div>인증 처리 중...</div>;
};

export default AuthSuccessPage;
