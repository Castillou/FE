import { PATH } from "@/constants/path";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center">
      <div className="w-32 h-32 mb-6 bg-red-400 rounded-full flex items-center justify-center text-title font-bold text-white">
        404
      </div>
      <Link
        to={PATH.designerList}
        className="px-10 py-2 rounded-lg bg-gray-scale-100 text-sub-body1 text-gray-scale-300 font-semibold"
      >
        홈으로
      </Link>
    </div>
  );
};

export default ErrorPage;
