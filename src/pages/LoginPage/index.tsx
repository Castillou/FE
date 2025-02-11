import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import devApi from "@/config/axiosDevConfig";
import Oauth from "@/Oauth";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOAuth = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await devApi.get<string>("/auth/login");

      if (response.status === 200 || response.status === 201) {
        console.log(response.data);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setSubmitError(err.response?.data || "로그인 중 오류가 발생했습니다.");
      } else {
        setSubmitError("알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-dvh pt-36 pb-20 px-12 flex flex-col justify-between">
      <section>
        <h1 className="w-52 h-52 rounded-full overflow-hidden m-auto">
          <img
            src="https://placehold.co/200x200?text=haertz"
            alt="logo image"
            className="size-full object-cover"
          />
        </h1>
      </section>
      <section>
        <Button onClick={handleOAuth} className="w-full rounded-full">
          {isSubmitting ? "요청중..." : "API 테스트"}
        </Button>
        {submitError && <p className="mt-1 text-sm text-center text-red-500">{submitError}</p>}
        <Oauth />
        <Drawer>
          <DrawerTrigger className="w-full rounded-full py-2 mb-6 bg-gray-500 text-white">
            계정 선택
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>계정 선택</DrawerTitle>
              <DrawerDescription>사용할 계정을 선택해주세요.</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button>계정1</Button>
              <Button>계정2</Button>
              <DrawerClose>
                <Button variant="outline" className="w-full">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
        <span className="block text-body2 text-gray-scale-200 text-center">
          haertz는 구글 계정으로 로그인 가능합니다.
        </span>
      </section>
    </div>
  );
};

export default LoginPage;
