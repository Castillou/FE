import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns"; // new import

const PaymentPreparePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // New state for user input
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [reservationTime, setReservationTime] = useState("10:00"); // using time picker (HH:mm)
  const [servicePrice, setServicePrice] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const handlePrepare = async () => {
    try {
      setLoading(true);
      const response = await paymentApi.payReady();
      const reservationId = response._id;

      // Format selectedDate as "yyyyMMdd" and append time from reservationTime (expected "HHmm")
      const datePart = selectedDate ? format(selectedDate, "yyyyMMdd") : "";
      // Remove colon from reservationTime to produce "HHmm"
      const timePart = reservationTime.replace(":", "");
      const formattedDate = datePart + timePart;

      // Pass the captured values along with reservationId
      navigate(PATH.payments, {
        state: {
          reservationData: {
            reservationId,
            selectedDate: formattedDate,
            servicePrice,
            selectedMode,
          },
        },
      });
    } catch {
      setError("예약 준비 중 오류가 발생했습니다.");
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
        {/* Calendar for selecting date */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">예약 날짜</label>
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
        </div>
        {/* Native time picker input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">예약 시간</label>
          <input
            type="time"
            value={reservationTime}
            onChange={(e) => setReservationTime(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        {/* Text input for service price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">결제 금액</label>
          <input
            type="text"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="예: 40000"
          />
        </div>
        {/* Text input for selected mode */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">예약 모드</label>
          <input
            type="text"
            value={selectedMode}
            onChange={(e) => setSelectedMode(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="예: 대면 / 비대면"
          />
        </div>
        <button
          onClick={handlePrepare}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded"
        >
          {loading ? "준비중..." : "예약 시작하기"}
        </button>
      </div>
    </div>
  );
};

export default PaymentPreparePage;
