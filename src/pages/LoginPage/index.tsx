import LogoSection from "./components/LogoSection";
import ButtonSection from "./components/ButtonSection";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      toast({
        variant: "destructive",
        title: "로그인에 실패하였습니다.",
        description: decodeURIComponent(error),
        duration: 3000,
      });
    }
  }, [searchParams, toast]);

  return (
    <>
      <div className="min-h-dvh pt-36 pb-20 px-12 flex flex-col justify-between">
        <LogoSection />
        <ButtonSection />
      </div>
      <Toaster />
    </>
  );
};

export default LoginPage;
