import LogoSection from "./components/LogoSection";
import ButtonSection from "./components/ButtonSection";

const LoginPage = () => {
  return (
    <div className="min-h-dvh pt-36 pb-20 px-12 flex flex-col justify-between">
      <LogoSection />
      <ButtonSection />
    </div>
  );
};

export default LoginPage;
