import useEmblaCarousel from "embla-carousel-react";

const Container = ({ children }: { children: React.ReactNode }) => {
  const options = { dragFree: true };
  const [emblaRef] = useEmblaCarousel(options);

  return (
    <div className="embla w-full overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">{children}</div>
    </div>
  );
};

export default Container;
