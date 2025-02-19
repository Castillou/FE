import { useEffect, useState, useRef, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { AxiosError } from "axios";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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

  return (
    <div className="min-h-dvh">
      {/* 상단 완료 메시지 */}
      <div className="flex flex-col items-center justify-center py-8 space-y-2">
        <Check className="w-10 h-10 mb-2 text-[#D896FF] stroke-2" />
        <h1 className="text-lg font-medium">예약이 완료되었습니다.</h1>
      </div>

      {/* 예약 정보 (paymentApi.approve 응답 기준) */}
      {/* <Card className="border-0 shadow-none px-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">예약 번호</span>
              <span className="text-gray-700">{paymentInfo?.reservation_id}</span>
            </div>
            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">예약자</span>
              <span className="text-gray-700">{paymentInfo?.user_id || "사용자"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" /> */}

      {/* 결제 정보 */}
      {/* <Card className="border-0 shadow-none px-6">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-medium">결제 정보</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex">
            <span className="text-[14px] text-gray-400 w-24">결제 금액</span>
            <span className="text-gray-700">{paymentInfo?.amount?.toLocaleString()}원</span>
          </div>
          <div className="flex">
            <span className="text-[14px] text-gray-400 w-24">결제 시간</span>
            <span className="text-gray-700">
              {paymentInfo && new Date(paymentInfo.approved_at).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card> */}

      <Separator className="my-4" />

      {/* 예약 상세 정보 */}
      <Card className="border-0 shadow-none px-6">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold">{designerInfo?.name || "디자이너 정보 없음"}</h2>
            <span className="px-3 py-1 text-xs text-[#B434FF] bg-[rgba(216,150,255,0.25)] rounded-full">
              {reservationPayload.mode}
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="flex">
            <span className="inline-block w-20 text-[14px] text-gray-400">일정</span>
            <span className="text-[14px] text-gray-700">
              {formatReservationDate(reservationPayload.reservation_date_time)}
            </span>
          </div>

          {reservationPayload.mode === "비대면" ? (
            <div className="flex flex-row items-center gap-4 w-[262px] h-8">
              <span className="inline-block w-20 text-[14px] text-[#C3C3C3] leading-[19px] tracking-[-0.04em]">
                컨설팅 링크
              </span>
              <button className="flex justify-center items-center px-5 py-[5px] w-[182px] h-8 bg-[#C3C3C3] rounded-[15px]">
                <span className="text-[14px] font-medium text-white text-center leading-[19px] tracking-[-0.04em]">
                  예약 30분 전 활성화됩니다
                </span>
              </button>
            </div>
          ) : (
            <div className="flex">
              <span className="inline-block w-20 text-[14px] text-gray-400">매장 정보</span>
              <span className="text-[14px] text-gray-700">
                {designerInfo?.shop_address || "매장 정보 없음"}
              </span>
              <button
                className="text-[14px] text-[#0C63D0]"
                onClick={() => {
                  if (designerInfo?.shop_address) {
                    navigator.clipboard.writeText(designerInfo.shop_address);
                  }
                }}
              >
                복사
              </button>
            </div>
          )}

          <div className="flex">
            <span className="inline-block w-20 text-[14px] text-gray-400">결제수단</span>
            <span className="text-[14px] text-gray-700">카카오페이</span>
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* 가격 정보 */}
      <Card className="border-0 shadow-none px-6">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mt-2">
            <span className="text-[16px] font-semibold text-black">가격</span>
            <span className="text-[16px] font-semibold text-[#D896FF]">
              {paymentInfo?.amount?.toLocaleString()}원
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 하단 버튼 */}
      <div className="flex justify-center items-center px-6">
        <div className="flex gap-4">
          <button
            className="px-8 py-3 bg-white border border-[#D896FF] rounded-lg text-[#D896FF] font-semibold"
            onClick={() => navigate(PATH.reservationList)}
          >
            예약확인
          </button>
          <button
            className="px-8 py-3 bg-[#D896FF] rounded-lg text-white font-semibold shadow-[0px_0px_4px_rgba(0,0,0,0.25)]"
            onClick={() => navigate(PATH.designerList)}
          >
            홈으로
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
