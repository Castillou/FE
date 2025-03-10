// import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import { formatReservationDate } from "@/utils/dayFormat";

const PaymentBankTransferPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(state.shop_address);
      alert("주소가 복사되었습니다.");
    } catch {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-dvh">
      <header className="flex flex-col items-center gap-2 mt-12 pb-[38px]">
        <img src="/images/timer.svg" alt="timer" className="mb-4" />
        <h2 className="text-xl mb-[7px] font-bold">예약 대기중입니다.</h2>
        <span className="text-sm text-[#C3C3C3]">
          24시간 이내 미입금 시 예약이 자동 취소됩니다.
        </span>
      </header>

      <div className="px-6">
        <div className="flex items-center gap-4 mb-5 pt-6 border-t border-gray-200">
          <p className="text-[20px] font-bold">{state.name}</p>
          <div className="bg-secondary-100 rounded-full px-3 py-[2px] whitespace-nowrap">
            <span className="text-[12px] text-primary-300">{state.selectedMode}</span>
          </div>
        </div>

        <div className="pb-7 border-b border-gray-200">
          <div className="flex justify-between mb-[18px]">
            <p className="text-[14px] text-[#C3C3C3] w-[25%] text-left">일정</p>
            <p className="text-[14px] text-[#000] w-[75%] text-left">
              {formatReservationDate(state.selectedDate)}
            </p>
          </div>

          {state.mode === "비대면" ? (
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
                {state.shop_address || "매장 정보 없음"}
                <span
                  className="ml-3 text-[#0C63D0] cursor-pointer hover:underline"
                  onClick={copyAddress}
                >
                  복사
                </span>
              </p>
            </div>
          )}

          <div className="flex justify-between mb-[18px] rounded-xl">
            <p className="text-[14px] text-[#C3C3C3] w-[25%] text-left">결제수단</p>
            <p className="text-[14px] text-[#000] w-[75%] text-left">계좌이체</p>
          </div>

          <div className="p-[14px] bg-secondary-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <p className="text-[14px] text-primary-100 w-[25%]">계좌</p>
              <p className="text-[14px] text-[#000] w-[75%] text-right">우리은행 1002059617442</p>
            </div>
            <div className="flex justify-between">
              <p className="text-[14px] text-primary-100 w-[25%]">예금주</p>
              <p className="text-[14px] text-[#000] w-[75%] text-right">블리스</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-sub-title font-bold text-[#000]">가격</p>
          <p className="text-sub-title font-bold text-primary-100">
            {Intl.NumberFormat("ko-KR").format(Number(state.servicePrice))}원
          </p>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="min-w-[375px] max-w-[450px] m-auto p-4 px-6 bg-white mt-8">
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
