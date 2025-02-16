import { useEffect, useState, useRef, ChangeEvent } from "react";
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

  // Reservation 생성용 폼 상태 (기본값은 고정값)
  const [reservationPayload, setReservationPayload] = useState<ReservationPayload>({
    reservation_id: "67b1e3299c941b90f4ffd518",
    designer_id: "67ab727934cd2146254af06a",
    user_id: "67b1e2959c941b90f4ffd517",
    reservation_date_time: "202503181900",
    consulting_fee: "30000",
    google_meet_link: "",
    mode: "비대면",
    status: "예약완료"
  });

  // input change handler
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 예약 생성 API 호출 함수
  const handleCreateReservation = async () => {
    try {
      setLoading(true);
      const reservationResponse = await axios.post("https://harmari.duckdns.org/reservation/create", reservationPayload);
      console.log("Reservation created:", reservationResponse.data);
      // 예약 생성 후 success 페이지 처리는 이미 이 페이지 내에서 보여주고 있으므로
      // 추가로 navigate 처리할 필요가 없을 수 있습니다.
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError(err.response?.data?.detail || "예약 생성 중 오류가 발생했습니다.");
      } else {
        setError("예약 생성 중 오류가 발생했습니다.");
      }
      setLoading(false);
    }
  };

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

          // 결제 승인 응답을 이용해 paymentInfo 상태 설정
          setPaymentInfo({ ...response });

          setLoading(false);
        } catch (err: unknown) {
          if (err instanceof AxiosError) {
            setError(err.response?.data?.detail || "결제 승인 처리 중 오류가 발생했습니다.");
          } else {
            setError("결제 승인 처리 중 오류가 발생했습니다.");
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
    return <div className="text-center p-8">처리 중...</div>;
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

      {/* 예약 생성 테스트용 입력 폼 */}
      <Card className="border-0 shadow-none px-6">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-medium">예약 생성 테스트</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">
              예약 번호
              <input
                type="text"
                name="reservation_id"
                value={reservationPayload.reservation_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              디자이너 ID
              <input
                type="text"
                name="designer_id"
                value={reservationPayload.designer_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              사용자 ID
              <input
                type="text"
                name="user_id"
                value={reservationPayload.user_id}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              예약 날짜 및 시간
              <input
                type="text"
                name="reservation_date_time"
                value={reservationPayload.reservation_date_time}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              컨설팅 비용
              <input
                type="text"
                name="consulting_fee"
                value={reservationPayload.consulting_fee}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              Google Meet 링크
              <input
                type="text"
                name="google_meet_link"
                value={reservationPayload.google_meet_link}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              예약 모드
              <input
                type="text"
                name="mode"
                value={reservationPayload.mode}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
            <label className="block text-sm text-gray-600">
              예약 상태
              <input
                type="text"
                name="status"
                value={reservationPayload.status}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md"
              />
            </label>
          </div>
          <Button
            className="mt-4 bg-black hover:bg-gray-800 text-white w-full h-12"
            onClick={handleCreateReservation}
          >
            예약 생성
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-4" />

      {/* 하단 버튼 */}
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
