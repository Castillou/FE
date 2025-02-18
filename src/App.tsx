import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import useAxiosInterceptor from "./hooks/useAxiosInterceptor";
import devApi from "./config/axiosDevConfig";

function App() {
  useAxiosInterceptor(devApi);
  return <RouterProvider router={router} />;
}

export default App;
