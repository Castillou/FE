import { DESIGNER_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";

export const getDesignerDetail = async (designer_id: string) => {
  try {
    const response = await devApi.get(DESIGNER_ENDPOINT.get_detail(designer_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
