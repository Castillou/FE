import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { paymentApi } from '../../services/paymentApi';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PATH } from '@/constants/path';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<'BANK' | 'KAKAO' | null>(null);
  const location = useLocation();
  const reservationId = location.state?.reservationId;
  const navigate = useNavigate();
  const [agreements, setAgreements] = useState({
    all: false,
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false
  });

  const handlePayment = async () => {
    if (selectedMethod === 'BANK') {
      navigate(PATH.paymentBankTransfer);
      return;
    }
    try {
      setLoading(true);
      const readyResponse = await paymentApi.ready({
        reservation_id: reservationId,
        user_id: "test-user",
        payment_method: "KAKAO_PAY",
        amount: 40000,
        status: "pending"
      });

      localStorage.setItem('tid', readyResponse.tid);
      localStorage.setItem('order_id', readyResponse.payment_id);

      window.location.href = readyResponse.next_redirect_pc_url;
    } catch (error) {
      setError(`결제 준비 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAllCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setAgreements({
      all: checked,
      agree1: checked,
      agree2: checked,
      agree3: checked,
      agree4: checked
    });
  };

  const handleSingleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const newAgreements = {
      ...agreements,
      [name]: checked
    };
    
    // 모든 항목이 체크되었는지 확인
    const allChecked = Object.keys(newAgreements)
      .filter(key => key !== 'all')
      .every(key => newAgreements[key as keyof typeof newAgreements]);
    
    setAgreements({
      ...newAgreements,
      all: allChecked
    });
  };

  if (loading) {
    return <div className="text-center p-8">결제 준비중...</div>;
  }

  return (
    <div className="min-h-dvh bg-gray-50 pb-[76px]">
      <h1 className="text-xl font-medium p-4 text-center border-b">결제</h1>
      
      <div className="px-6">
        {/* 예약 정보 */}
        <Card className="rounded-none bg-gray-100 mt-4">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2">예약정보</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <div>대면/비대면 예약</div>
              <div>디자이너 이름 : 헤르츠 컨설턴트</div>
              <div>일정: 2025년 2월 21일 오전 11:30</div>
              <div>가격: 40,000원</div>
            </div>
          </CardContent>
        </Card>

        {/* 예약자 정보 */}
        <Card className="rounded-none mt-4">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2">예약자 정보</h2>
            <div className="space-y-2 text-sm">
              <div>이름: 홍길동</div>
              <div>이메일: hong@gmail.com</div>
            </div>
          </CardContent>
        </Card>

        {/* 결제수단 */}
        <Card className="rounded-none mt-4">
          <CardContent className="p-4">
            <h2 className="font-medium mb-2">결제수단</h2>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className={`w-full justify-start h-12 transition-all ${
                  selectedMethod === 'BANK' 
                    ? 'border-2 border-black bg-gray-50' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setSelectedMethod('BANK')}
              >
                계좌이체
              </Button>
              <Button 
                variant="outline" 
                className={`w-full justify-start h-12 transition-all ${
                  selectedMethod === 'KAKAO' 
                    ? 'border-2 border-black bg-gray-50' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setSelectedMethod('KAKAO')}
              >
                카카오페이
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 동의하기 */}
        <Card className="rounded-none mt-4">
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* 전체 동의 */}
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="agreeAll" 
                  checked={agreements.all}
                  onChange={handleAllCheck}
                  className="w-4 h-4" 
                />
                <label htmlFor="agreeAll" className="text-sm font-medium">
                  전체 동의하기
                </label>
              </div>

              {/* 개별 동의 항목들 */}
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="agree1" 
                      name="agree1"
                      checked={agreements.agree1}
                      onChange={handleSingleCheck}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="agree1" className="text-xs text-gray-600">
                      상기 결제 내역을 확인, 결제 진행에 동의
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="agree2" 
                      name="agree2"
                      checked={agreements.agree2}
                      onChange={handleSingleCheck}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="agree2" className="text-xs text-gray-600">
                      [필수] 개인정보수집 동의
                    </label>
                  </div>
                  <button className="text-xs text-gray-400">전체보기</button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="agree3" 
                      name="agree3"
                      checked={agreements.agree3}
                      onChange={handleSingleCheck}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="agree3" className="text-xs text-gray-600">
                      [필수] 제3자 정보제공 동의
                    </label>
                  </div>
                  <button className="text-xs text-gray-400">전체보기</button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="agree4" 
                      name="agree4"
                      checked={agreements.agree4}
                      onChange={handleSingleCheck}
                      className="w-4 h-4" 
                    />
                    <label htmlFor="agree4" className="text-xs text-gray-600">
                      [필수] 위수탁/번영/환불 수수료 동의
                    </label>
                  </div>
                  <button className="text-xs text-gray-400">전체보기</button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 하단 버튼 - fixed 제거하고 margin으로 간격 조정 */}
      <div className="min-w-[375px] max-w-[430px] m-auto p-4 px-6 bg-white border-t mt-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">총 결제금액</span>
            <span className="text-lg font-bold">40,000원</span>
          </div>
          <Button 
            className="w-[120px] h-12 bg-black hover:bg-gray-800"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? '처리중...' : '결제하기'}
          </Button>
        </div>
      </div>

      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;