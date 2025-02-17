import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const PaymentBankTransferPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="min-h-dvh">
      <h1 className="text-xl font-medium p-4 text-center border-b">계좌이체 안내</h1>

      <div className="px-6">
        {/* 예약 완료 메시지 */}
        <div className="py-8 text-center">
          <h2 className="text-xl font-medium mb-2">예약이 완료되었습니다</h2>
          <p className="text-sm text-gray-600">아래 계좌로 입금해 주세요</p>
        </div>

        {/* 계좌 정보 */}
        <Card className="rounded-none bg-gray-100">
          <CardContent className="p-4">
            <h2 className="font-medium mb-4">입금 정보</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">입금 금액</span>
                <span className="font-bold text-lg">
                  {Intl.NumberFormat("ko-KR").format(Number(state.servicePrice))}원
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">입금 계좌</span>
                <span className="font-medium">신한은행 110-123-456789</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">예금주</span>
                <span className="font-medium">할머리</span>
              </div>
              <div className="mt-4 p-3 bg-white rounded text-sm text-gray-600">
                ※ 예약자 성함과 동일한 이름으로 입금해 주세요.
                <br />※ 24시간 이내 미입금 시 예약이 자동 취소됩니다.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 하단 버튼 */}
      <div className="min-w-[375px] max-w-[430px] m-auto p-4 px-6 bg-white border-t mt-8">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="w-1/2 h-12"
            onClick={() => navigate(PATH.reservationList)}
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

export default PaymentBankTransferPage;
