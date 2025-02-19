import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect } from "react";

const useAxiosInterceptor = (instance: AxiosInstance) => {
  const onRequest = (config: InternalAxiosRequestConfig) => {
    return config;
  };

  const onRequestError = (error: AxiosError) => {
    if (import.meta.env.MODE === "development") {
      console.error(`요청 API 오류 : ${error.message}`);
    }
    return Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse) => {
    return response;
  };

  const onError = (status: number, message: string, errorDetail: string) => {
    const error = { status, message, errorDetail };
    throw error;
  };

  const onResponseError = (error: AxiosError) => {
    if (axios.isAxiosError(error) && error.response) {
      const { status, statusText, data } = error.response;
      console.error(
        `[API Error] ${status} ${statusText} | ${
          (data as { message?: string })?.message || "알 수 없는 오류"
        }`
      );

      switch (status) {
        case 400: {
          onError(
            status,
            "잘못된 요청입니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
          break;
        }
        case 401: {
          onError(
            status,
            "인증되지 않은 사용자입니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
          break;
        }
        case 403: {
          onError(
            status,
            "권한이 없습니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
          break;
        }
        case 404: {
          onError(
            status,
            "찾을 수 없는 페이지 입니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
          break;
        }
        case 500: {
          onError(
            status,
            "서버 오류입니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
          break;
        }
        default: {
          onError(
            status,
            "에러가 발생했습니다.",
            (data as { message?: string })?.message || "알 수 없는 오류"
          );
        }
      }
    } else {
      console.error("[API Error] 네트워크 오류 또는 알 수 없는 오류");
      onError(0, "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.", "알 수 없는 오류");
    }
    return Promise.reject(error);
  };

  const setupInterceptors = () => {
    const requestInterceptor = instance.interceptors.request.use(onRequest, onRequestError);
    const responseInterceptor = instance.interceptors.response.use(onResponse, onResponseError);
    return { requestInterceptor, responseInterceptor };
  };

  const ejectInterceptors = (requestInterceptor: number, responseInterceptor: number) => {
    instance.interceptors.request.eject(requestInterceptor);
    instance.interceptors.response.eject(responseInterceptor);
  };

  useEffect(() => {
    const { requestInterceptor, responseInterceptor } = setupInterceptors();

    return () => {
      ejectInterceptors(requestInterceptor, responseInterceptor);
    };
  }, []);
};

export default useAxiosInterceptor;
