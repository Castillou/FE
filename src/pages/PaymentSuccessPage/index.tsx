import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { AxiosError } from "axios";
import { Check } from "lucide-react";
import { DesignerDetailResponse } from "@/types/apiTypes";
import { getDesignerDetail } from "@/apis/designerDetail";
import { formatReservationDate } from "@/utils/dayFormat";
import { PaymentInfo } from "@/types/payment";
import { getReservationDetail } from "@/apis/reservationDetail";
import { ReservationCreate } from "@/apis/reservation";
import { useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { ReservationCreateRequest } from "@/types/reservation";
import { Button } from "@/components/ui/button";
interface ReservationPayload {
  reservation_id: string;
  designer_id: string;
  user_id: string;
  reservation_date_time: string;
  consulting_fee: string;
  google_meet_link: string;
  mode: string;
  status: string;
}

const PaymentSuccessPage = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const isProcessingRef = useRef(false);
  const [designerInfo, setDesignerInfo] = useState<DesignerDetailResponse | null>(null);

  const [reservationPayload, setReservationPayload] = useState<ReservationPayload>({
    reservation_id: "67b1e3299c941b90f4ffd518",
    designer_id: "67ab727934cd2146254af06a",
    user_id: "67b1e2959c941b90f4ffd517",
    reservation_date_time: "202503181900",
    consulting_fee: "30000",
    google_meet_link: "",
    mode: "비대면",
    status: "예약완료",
  });

  // 예약 목록 조회 쿼리 무효화 및 새로고침
  const invalidateAndRefetchQueries = useCallback(
    async (userId: string) => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.reservationList.all,
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.reservationList.all,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.reservationList.list(userId),
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.reservationList.list(userId),
      });
    },
    [queryClient]
  );

  // 결제 승인 처리
  const handlePaymentApproval = async (pg_token: string, tid: string, order_id: string) => {
    try {
      const response = await paymentApi.approve({ tid, pg_token, order_id });
      localStorage.removeItem("tid");
      localStorage.removeItem("order_id");
      return response;
    } catch (err) {
      throw new Error(
        err instanceof AxiosError
          ? err.response?.data?.detail || "결제 승인 처리 중 오류가 발생했습니다."
          : "결제 승인 처리 중 오류가 발생했습니다."
      );
    }
  };

  // 결제 승인 및 예약 처리
  const processPaymentAndReservation = useCallback(async () => {
    try {
      setLoading(true);
      const pg_token = searchParams.get("pg_token");
      const tid = localStorage.getItem("tid");
      const order_id = localStorage.getItem("order_id");

      if (!pg_token || !tid || !order_id) {
        throw new Error("결제 정보가 없습니다.");
      }

      // 결제 승인 처리
      const paymentResponse = await handlePaymentApproval(pg_token, tid, order_id);
      setPaymentInfo(paymentResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : "처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  // 예약 생성
  const processReservation = useCallback(async () => {
    try {
      setLoading(true);
      const reservationDataStr = localStorage.getItem("reservation");

      if (!reservationDataStr) {
        throw new Error("예약 정보가 없습니다.");
      }

      const newReservationData: ReservationCreateRequest = JSON.parse(reservationDataStr);

      const reservationCreateResponse = await ReservationCreate(newReservationData);

      // 모든 예약 관련 쿼리 무효화
      await invalidateAndRefetchQueries(reservationCreateResponse.user_id);

      const reservationResponse = await getReservationDetail(
        reservationCreateResponse.reservation_id
      );

      if (reservationResponse) {
        setReservationPayload({
          reservation_id: reservationCreateResponse.reservation_id,
          designer_id: reservationCreateResponse.designer_id,
          user_id: reservationCreateResponse.user_id,
          reservation_date_time: reservationCreateResponse.reservation_date_time,
          consulting_fee: newReservationData.consulting_fee.toString(),
          google_meet_link: reservationCreateResponse.google_meet_link,
          mode: reservationCreateResponse.mode,
          status: reservationCreateResponse.status,
        });
        // 디자이너 정보 가져오기
        const designerResponse = await getDesignerDetail(reservationCreateResponse.designer_id);
        setDesignerInfo(designerResponse);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "예약 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [invalidateAndRefetchQueries]);

  useEffect(() => {
    const processAll = async () => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        setLoading(true);
        // 먼저 결제 승인을 처리
        await processPaymentAndReservation();
        // 결제 승인이 성공한 후 예약 처리
        await processReservation();
      } catch (err) {
        setError(err instanceof Error ? err.message : "처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
        isProcessingRef.current = false;
      }
    };

    processAll();
  }, [processPaymentAndReservation, processReservation]);

  if (loading) {
    return <div className="text-center p-8">처리 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">에러: {error}</div>;
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(designerInfo?.shop_address || "");
      alert("주소가 복사되었습니다.");
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-dvh">
      {/* 상단 완료 메시지 */}
      <div className="flex flex-col items-center justify-center mt-12 pb-[38px]">
        <Check className="w-10 h-10 mb-8 text-[#D896FF] stroke-2" />
        <h1 className="text-xl mb-[7px] font-bold">예약이 완료되었습니다.</h1>
      </div>

      <div className="px-6">
        <div className="flex items-center gap-4 mb-3 pt-6 border-t border-gray-200">
          <p className="text-[20px] font-bold">{designerInfo?.name || "디자이너 정보 없음"}</p>
          <div className="bg-secondary-100 rounded-full px-3 py-[2px] whitespace-nowrap">
            <span className="text-[12px] text-primary-300">{reservationPayload.mode}</span>
          </div>
        </div>

        <div className="pb-6 border-b border-gray-200">
          <div className="flex justify-between mb-[18px]">
            <p className="text-[14px] text-[#C3C3C3] w-[25%] text-left">일정</p>
            <p className="text-[14px] text-[#000] w-[75%] text-left">
              {formatReservationDate(reservationPayload.reservation_date_time)}
            </p>
          </div>

          {reservationPayload.mode === "비대면" ? (
            <div className="flex justify-between items-center mb-[18px]">
              <span className="w-[25%] text-[14px] text-[#C3C3C3]">컨설팅 링크</span>
              <div className="w-[75%]">
                <button className="flex justify-center items-center px-5 py-2 text-white bg-[#C3C3C3] rounded-full">
                  예약 30분 전 활성화됩니다
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between mb-[18px]">
              <p className="text-[14px] text-[#C3C3C3] w-[25%] text-left">매장 정보</p>
              <p className="text-[14px] text-[#000] w-[75%] text-left">
                {designerInfo?.shop_address || "매장 정보 없음"}
                <span
                  className="ml-3 text-[#0C63D0] cursor-pointer hover:underline"
                  onClick={copyAddress}
                >
                  복사
                </span>
              </p>
            </div>
          )}

          <div className="flex justify-between rounded-xl">
            <p className="text-[14px] text-[#C3C3C3] w-[25%] text-left">결제수단</p>
            <p className="text-[14px] text-[#000] w-[75%] text-left">카카오페이</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sub-title font-bold text-[#000]">가격</p>
          <p className="text-sub-title font-bold text-primary-100">
            {Intl.NumberFormat("ko-KR").format(Number(paymentInfo?.amount))}원
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="min-w-[375px] max-w-[450px] m-auto p-4 px-6 bg-white mt-6">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="w-1/2 h-12 text-primary-100 border-primary-100 rounded-[12px]"
            onClick={() => navigate(PATH.reservationList)}
          >
            예약목록
          </Button>
          <Button
            className="w-1/2 h-12 hover:opacity-80 bg-primary-100 text-white rounded-[12px]"
            onClick={() => navigate(PATH.designerList)}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
