export const serverURL = import.meta.env.VITE_API_BASE_URL;

// 로컬 서버 엔드포인트
export const localURL = "http://localhost:3001";

interface ReservationEndpoint {
  list: string;
}

interface LocalEndpoint {
  designers: string;
}

export const RESERVATION_ENDPOINT: ReservationEndpoint = Object.freeze({
  list: `${serverURL}/reservations/list`,
});

export const LOCAL_ENDPOINT: LocalEndpoint = Object.freeze({
  designers: `${localURL}/designers`,
});