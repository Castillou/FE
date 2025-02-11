import KakaoTest from "@/KakaoTest";
import Oauth from "@/oauth";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <KakaoTest />
	},
	{
		path: "/oauth",
		element: <Oauth />,
	},
]);

export default router;
