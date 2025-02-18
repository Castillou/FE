// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const PaymentBankTransferPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const copyAddress = () => {
    navigator.clipboard.writeText(state.address);
  };

  return (
    <div className="min-h-dvh">
      <header className="flex flex-col items-center gap-2 mt-12 pb-[38px] border-b border-gray-200">
        <img src="/images/timer.svg" alt="timer" className="mb-4" />
        <h2 className="text-xl mb-[7px] font-bold">예약 대기중입니다.</h2>
        <span className="text-sm text-[#C3C3C3]">
          24시간 이내 미입금 시 예약이 자동 취소됩니다.
        </span>
      </header>

      <div className="px-6 mt-12">
        <div className="flex items-center gap-2">
          <p className="text-[20px] font-bold">{state.name}</p>
          <div className="bg-secondary-100 rounded-full px-3 py-[2px] whitespace-nowrap">
            <span className="text-[12px] text-primary-300">{state.selectedMode}</span>
          </div>
        </div>

        <div className="pb-7 border-b border-gray-200">
          <div className="flex justify-between mb-[18px]">
            <p className="text-[14px] text-[#C3C3C3] w-[30%] text-left">일정</p>
            <p className="text-[14px] text-[#000] w-[70%] text-left">{state.selectedDate}</p>
          </div>

          <div className="flex justify-between mb-[18px]">
            <p className="text-[14px] text-[#C3C3C3] w-[30%] text-left">매장 정보</p>
            <p className="text-[14px] text-[#000] w-[70%] text-left">
              {state.address}{" "}
              <span className="text-[#0C63D0] cursor-pointer hover:underline" onClick={copyAddress}>
                복사
              </span>
            </p>
          </div>

          <div className="flex justify-between mb-[18px]">
            <p className="text-[14px] text-[#C3C3C3] w-[30%] text-left">결제수단</p>
            <p className="text-[14px] text-[#000] w-[70%] text-left">계좌이체</p>
          </div>

          <div className="p-[14px] bg-secondary-100 rounded-lg">
            <div className="flex justify-between">
              <p className="text-[14px] text-primary-100 w-[30%]">계좌</p>
              <p className="text-[14px] text-[#000] w-[70%] text-right">우리은행 1002059617442</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] text-primary-100 w-[30%]">예금주</p>
              <p className="text-[14px] text-[#000] w-[70%] text-right">블리스</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className=" text-[#000]">가격</p>
          <p className=" text-primary-100">{state.servicePrice}</p>
        </div>

        {/* 예약 완료 메시지 */}
        <div className="py-8 text-center">
          <p className="text-sm text-gray-600">아래 계좌로 입금해 주세요</p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="min-w-[375px] max-w-[450px] m-auto p-4 px-6 bg-white border-t mt-8">
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

export default PaymentBankTransferPage;
