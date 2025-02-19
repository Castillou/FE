import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { AxiosError } from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import { DesignerDetailResponse } from "@/types/apiTypes";
import { getDesignerDetail } from "@/apis/designerDetail";
import { formatReservationDate } from "@/utils/dayFormat";
import { PaymentInfo } from "@/types/payment";
import { getReservationDetail } from "@/apis/reservationDetail";

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

  // // 예약 생성 API 호출 함수
  // const handleCreateReservation = useCallback(async (reservationPayload: ReservationPayload) => {
  //   try {
  //     setLoading(true);
  //     const reservationResponse = await devApi.post(
  //       RESERVATION_ENDPOINT.create,
  //       reservationPayload
  //     );
  //     console.log("Reservation created:", reservationResponse.data);
  //     // 예약 생성 후 success 페이지 처리는 이미 이 페이지 내에서 보여주고 있으므로
  //     // 추가로 navigate 처리할 필요가 없을 수 있습니다.
  //     setLoading(false);
  //   } catch (err: unknown) {
  //     if (err instanceof AxiosError) {
  //       setError(err.response?.data?.detail || "예약 생성 중 오류가 발생했습니다.");
  //     } else {
  //       setError("예약 생성 중 오류가 발생했습니다.");
  //     }
  //     setLoading(false);
  //   }
  // }, []);

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

  // useEffect(() => {
  //   const reservationDataStr = localStorage.getItem("reservationData");
  //   if (reservationDataStr) {
  //     const reservationData: ReservationCreateRequest = JSON.parse(reservationDataStr);
  //     const newReservationPayload = {
  //       ...reservationData,
  //       status: "예약완료",
  //     };

  //     setReservationPayload(newReservationPayload);
  //     handleCreateReservation(newReservationPayload);

  //     invalidateAndRefetchQueries(reservationData.user_id);

  //     // 사용 후 데이터 삭제
  //     localStorage.removeItem("reservationData");
  //   }
  // }, [handleCreateReservation, invalidateAndRefetchQueries]);

  useEffect(() => {
    const processPaymentAndReservation = async () => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        setLoading(true);
        const pg_token = searchParams.get("pg_token");
        const tid = localStorage.getItem("tid");
        const order_id = localStorage.getItem("order_id");
        const reservation_id = localStorage.getItem("reservation_id");

        if (!pg_token || !tid || !order_id) {
          throw new Error("결제 정보가 없습니다.");
        }

        // 결제 승인 처리
        const paymentResponse = await handlePaymentApproval(pg_token, tid, order_id);
        setPaymentInfo(paymentResponse);

        if (!reservation_id) {
          throw new Error("예약 정보가 없습니다.");
        }

        const reservationResponse = await getReservationDetail(reservation_id);
        localStorage.removeItem("reservation_id");

        if (reservationResponse) {
          setReservationPayload({
            reservation_id: reservationResponse.id,
            designer_id: reservationResponse.designer_id,
            user_id: reservationResponse.user_id,
            reservation_date_time: reservationResponse.reservation_date_time,
            consulting_fee: reservationResponse.consulting_fee.toString(),
            google_meet_link: reservationResponse.google_meet_link,
            mode: reservationResponse.mode,
            status: reservationResponse.status,
          });
          // 디자이너 정보 가져오기
          const designerResponse = await getDesignerDetail(reservationResponse.designer_id);
          setDesignerInfo(designerResponse);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "처리 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
        isProcessingRef.current = false;
      }
    };

    processPaymentAndReservation();
  }, [reservationPayload.designer_id, searchParams]);

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
      <Card className="border-0 shadow-none px-6">
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
            {/* 추가 정보는 필요에 따라 렌더링 */}
          </div>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* 결제 정보 */}
      <Card className="border-0 shadow-none px-6">
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
      </Card>

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
            <span className="text-[14px] text-gray-400 w-24">일정</span>
            <span className="text-[14px] text-gray-700">
              {formatReservationDate(reservationPayload.reservation_date_time)}
            </span>
          </div>

          {reservationPayload.mode === "비대면" ? (
            <div className="flex flex-row items-center gap-4 w-[262px] h-8">
              <span className="text-[14px] text-[#C3C3C3] leading-[19px] tracking-[-0.04em]">
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
              <span className="text-[14px] text-gray-400 w-24">매장 정보</span>
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
            <span className="text-[14px] text-gray-400 w-24">결제수단</span>
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
