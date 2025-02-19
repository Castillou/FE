import devApi from "@/config/axiosDevConfig";
import {
  PaymentReadyRequest,
  PaymentReadyResponse,
  PaymentApproveRequest,
  PaymentInfo,
} from "../types/payment";

const BASE_URL = "https://harmari.duckdns.org";
//const BASE_URL = 'http://localhost:8000';

interface PayReadyResponse {
  _id: string;
}

export const paymentApi = {
  ready: async (data: PaymentReadyRequest): Promise<PaymentReadyResponse> => {
    const response = await devApi.post(`${BASE_URL}/payments/ready`, data);
    return response.data;
  },

  approve: async (data: PaymentApproveRequest): Promise<PaymentInfo> => {
    const response = await devApi.post(`${BASE_URL}/payments/approve`, data);
    return response.data;
  },

  cancel: async (data: {
    payment_id: string;
    cancel_reason: string;
    cancel_amount: number;
  }): Promise<PaymentInfo> => {
    const response = await devApi.post(`${BASE_URL}/payments/cancel`, data);
    return response.data;
  },

  // 테스트용 reservation 생성
  payReady: async (designer_id: string, selectedDate: string): Promise<PayReadyResponse> => {
    const response = await devApi.get(
      `${BASE_URL}/reservation/pay_ready?designer_id=${designer_id}&reservation_date_time=${selectedDate}`
    );
    return response.data;
  },
};
