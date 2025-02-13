import { DESIGNER_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getDesignerList = async () => {
  try {
    const response = await devApi.get(DESIGNER_ENDPOINT.designers);

    return response.data;
  } catch (error) {
    // 추후 에러 핸들링 필요
    console.log(error);
  }
};
