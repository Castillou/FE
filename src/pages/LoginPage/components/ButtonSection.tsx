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
        className="w-full rounded-lg py-3 my-5 text-sub-title bg-[#B434FF] text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "요청중..." : "구글 로그인"}
      </button>
      {submitError && <p className="mt-1 text-sm text-center text-red-500">{submitError}</p>}
      <span className="block text-body2 text-gray-scale-200 text-center">
        haertz는 구글 계정으로 로그인 가능합니다.
      </span>
    </section>
  );
};

export default ButtonSection;
