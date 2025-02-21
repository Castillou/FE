const LogoSection = () => {
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="w-3/4 overflow-hidden m-auto mb-1">
        <img src="/images/white-logo-svg.svg" alt="logo image" className="size-full object-cover" />
      </h1>
      <p className=" text-white text-sub-title">실패하지 않는 헤어컨설팅</p>
    </section>
  );
};

export default LogoSection;
