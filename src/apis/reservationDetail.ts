import axios from "axios";
import { RESERVATION_ENDPOINT } from "./endpoints";

export const getReservationDetail = async (reservation_id: string) => {
  try {
    const response = await axios.get(RESERVATION_ENDPOINT.get_detail(reservation_id));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
