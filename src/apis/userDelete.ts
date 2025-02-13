import devApi from "@/config/axiosDevConfig";

export const userDelete = async () => {
  try {
    const response = await devApi.post("/user/delete");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
