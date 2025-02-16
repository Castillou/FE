import { FilterOptions } from "@/types/types";
import { DESIGNER_ENDPOINT } from "./endpoints";
import devApi from "@/config/axiosDevConfig";
import qs from "qs";

export const getDesignerList = async (filterOptions: FilterOptions) => {
  try {
    const response = await devApi.get(DESIGNER_ENDPOINT.designers, {
      params: {
        region: filterOptions.designer_location,
        available_modes: filterOptions.designer_mode,
      },
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    });
    return response.data.designer_list;
  } catch (error) {
    // 추후 에러 핸들링 필요
    console.log(error);
  }
};
