export const serverURL = import.meta.env.VITE_API_BASE_URL;

export const RESERVATION_ENDPOINT = Object.freeze({
  list: `${serverURL}/reservations/list`,
});
