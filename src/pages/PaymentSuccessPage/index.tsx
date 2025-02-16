import { useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { AxiosError } from "axios";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check } from "lucide-react";
import axios from "axios";

interface PaymentInfo {
  amount: number;
  reservation_id: string;
  approved_at: string;
  user_id: string;
}

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    // 개발 테스트용 URL인 경우 mock 데이터 사용
    // if (window.location.pathname === '/payment/success-test') {
    //   setPaymentInfo({
    //     amount: 40000,
    //     reservation_id: 'test-123',
    //     approved_at: new Date().toISOString()
    //   });
    //   setLoading(false);
    //   return;
    // }

    const approvePayment = async () => {
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

      try {
        const pg_token = searchParams.get("pg_token");
        const tid = localStorage.getItem("tid");
        const order_id = localStorage.getItem("order_id");

        if (!pg_token || !tid || !order_id) {
          throw new Error("결제 정보가 없습니다.");
        }

        try {
          // 결제 승인 처리
          const response = await paymentApi.approve({
            tid,
            pg_token,
            order_id,
          });

          localStorage.removeItem("tid");
          localStorage.removeItem("order_id");

          // /reservation/create 엔드포인트 호출
          const createPayload = {
            reservation_id: "67b1e3299c941b90f4ffd518",
            designer_id: "67ab727934cd2146254af06a",
            user_id: "67b1e2959c941b90f4ffd517",
            reservation_date_time: "202503181900",
            consulting_fee: "30000",
            google_meet_link: "",
            mode: "비대면",
            status: "예약완료"
          };

          const reservationResponse = await axios.post("https://harmari.duckdns.org/reservation/create", createPayload);
          console.log("Reservation created:", reservationResponse.data);
          
          setLoading(false);
    
          setPaymentInfo({ ...response});

          // reservation 생성이 성공하면 success 페이지로 이동
        } catch (err: unknown) {
          if (err instanceof AxiosError) {
            setError(err.response?.data?.detail || "결제 승인 또는 예약 생성 중 오류가 발생했습니다.");
          } else {
            setError("결제 승인 또는 예약 생성 중 오류가 발생했습니다.");
          }
          setLoading(false);
        }
      } catch {
        setError("결제 정보가 올바르지 않습니다.");
        setLoading(false);
      }
    };

    approvePayment();

    return () => {
      isProcessingRef.current = false;
    };
  }, [searchParams]);

  if (loading) {
    return <div className="text-center p-8">결제 승인 처리 중...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">에러: {error}</div>;
  }

  return (
    <div className="min-h-dvh bg-gray-50 pb-[76px]">
      {/* 상단 완료 메시지 */}
      <div className="flex flex-col items-center justify-center py-8 space-y-2">
        <Check className="w-10 h-10 mb-2 text-black stroke-2" />
        <h1 className="text-lg font-medium">예약이 완료되었습니다.</h1>
      </div>

      {/* 예약 정보 */}
      <Card className="border-0 shadow-none px-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">예약 번호</span>
              <span className="text-gray-700">{paymentInfo?.reservation_id}</span>
            </div>

            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">날짜/시간</span>
              <span className="text-gray-700">2025년 2월 21일 오전 11:30</span>
            </div>

            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">매장/담당</span>
              <span className="text-gray-700">헤어디너 컨설스토리점</span>
            </div>

            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">컨설팅 방식</span>
              <span className="text-gray-700">대면</span>
            </div>

            <div className="flex">
              <span className="text-[14px] text-gray-400 w-24">예약자</span>
              <span className="text-gray-700">{paymentInfo?.user_id || "사용자"}</span>
            </div>
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
            <span className="text-gray-700">{paymentInfo?.amount.toLocaleString()}원</span>
          </div>
          <div className="flex">
            <span className="text-[14px] text-gray-400 w-24">결제 시간</span>
            <span className="text-gray-700">
              {paymentInfo && new Date(paymentInfo.approved_at).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 광고 배너 - 티켓 스타일 */}
      <div className="px-4 mt-6">
        <div className="bg-black p-4 pt-5 pb-2 rounded-lg">
          <div className="text-white text-sm mb-3 text-center">
            쿠폰받고 헤르츠 특별 컨설팅도 이용해보세요!
          </div>

          <div className="bg-[#FFD700] p-3 rounded-lg relative overflow-hidden w-[85%] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-black text-lg font-bold">~17,000</span>
                <div className="text-[10px] text-gray-700 mt-1">
                  첫 결제 고객님을 위한 특별 할인
                  <br />
                  즉시할인/쿠폰혜택 안내
                </div>
              </div>
              {/* 다운로드 아이콘 */}
              <svg
                className="w-5 h-5 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
            {/* 티켓 스타일을 위한 원형 장식 */}
            <div className="absolute -left-2 top-1/2 w-3 h-3 bg-black rounded-full transform -translate-y-1/2" />
            <div className="absolute -right-2 top-1/2 w-3 h-3 bg-black rounded-full transform -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* 하단 버튼 - fixed 제거하고 margin으로 간격 조정 */}
      <div className="min-w-[375px] max-w-[430px] m-auto p-4 bg-white border-t mt-8">
        <div className="flex gap-3 px-2">
          <Button
            variant="outline"
            className="w-1/2 h-12"
            onClick={() =>
              paymentInfo?.reservation_id
                ? navigate(PATH.reservationDetail(paymentInfo?.reservation_id))
                : navigate(PATH.reservationList)
            }
          >
            예약확인
          </Button>
          <Button
            className="w-1/2 h-12 bg-black hover:bg-gray-800"
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
