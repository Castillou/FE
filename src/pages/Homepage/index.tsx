import { Button } from "@/components/ui/button";

const HomePage = () => {
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
        <Button className="w-full rounded-full py-7 mb-6">구글 로그인</Button>
        <span className="block text-body2 text-gray-scale-200 text-center">
          haertz는 구글 계정으로 로그인 가능합니다.
        </span>
      </section>
    </div>
  );
};

export default HomePage;
