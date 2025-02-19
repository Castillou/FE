import axios from "axios";
import { useState } from "react";
import devApi from "@/config/axiosDevConfig";

interface GoogleLoginResponse {
  auth_url: string;
}

const ButtonSection = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOAuth = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await devApi.get<GoogleLoginResponse>("/auth/login");

      if (response.status === 200) {
        const { auth_url } = response.data;
        window.location.href = auth_url; // 구글 로그인 페이지로 리디렉션
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSubmitError(err.response?.data?.message || "로그인 중 오류가 발생했습니다.");
      } else {
        setSubmitError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <button
        onClick={handleOAuth}
        className="flex items-center justify-center gap-[10px] w-full rounded-xl py-3 mt-5 mb-3 text-sub-title bg-white text-[#000]"
        disabled={isSubmitting}
      >
        <img src="/images/google-icon.png" alt="구글 로고" className="w-5 h-5" />
        {isSubmitting ? "요청중..." : "구글 계정으로 계속하기"}
      </button>
      {submitError && <p className="mt-1 text-sm text-center text-red-500">{submitError}</p>}
      <span className="block text-body2 text-gray-scale-100 text-center">
        haertz는 구글 계정으로 로그인 가능합니다.
      </span>
    </section>
  );
};

export default ButtonSection;
