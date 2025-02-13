import devApi from "@/config/axiosDevConfig";

export const userLogout = async () => {
  try {
    const response = await devApi.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
