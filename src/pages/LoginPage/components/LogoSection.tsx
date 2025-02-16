const LogoSection = () => {
  return (
    <section>
      <h1 className="w-60 overflow-hidden m-auto mb-5">
        <img src="/images/main-logo.png" alt="logo image" className="size-full object-cover" />
      </h1>
      <p className="text-center text-sub-title font-semibold text-gray-scale-300">
        헤르츠와 함께 <br />
        헤어 고민을 해결하세요!
      </p>
    </section>
  );
};

export default LogoSection;
