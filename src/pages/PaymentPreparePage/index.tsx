import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paymentApi } from '../../services/paymentApi';
import { PATH } from '@/constants/path';


// 테스트용 결제 준비 페이지
const PaymentPreparePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrepare = async () => {
    try {
      setLoading(true);
      const response = await paymentApi.payReady();
      const reservationId = response._id;
      
      navigate(PATH.payments, { 
        state: { reservationId } 
      });
    } catch {
      setError('예약 준비 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">예약 준비</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <button
          onClick={handlePrepare}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
        >
          {loading ? '준비중...' : '예약 시작하기'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPreparePage; 