import devApi from "@/config/axiosDevConfig";

export const userDelete = async () => {
  try {
    const response = await devApi.delete("/user/me");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
