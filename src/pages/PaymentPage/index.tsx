import { useCallback, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserMe } from "@/apis/user"; // new import
import { paymentApi } from "../../services/paymentApi";
import { PATH } from "@/constants/path";
import { formatReservationDate, formatReverseDate } from "@/utils/dayFormat";
import { ConsultingReservationData } from "@/types/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import QUERY_KEY from "@/constants/queryKey";
import { ReservationCreateRequest } from "@/types/reservation";
import { ReservationCreate } from "@/apis/reservation";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const PaymentPage = () => {
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<"BANK" | "KAKAO" | null>(null);
  const [reservationId, setReservationId] = useState<string>("");
  const { state } = useLocation();
  const ReservationData: ConsultingReservationData = state;
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: QUERY_KEY.user.me,
    queryFn: getUserMe,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
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

  // 모바일 환경 체크 함수 추가
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };

  // 페이지 진입 시 예약 가능 여부 확인
  useEffect(() => {
    const checkReservationAvailability = async () => {
      try {
        // 단순 조회가 아닌 reservationId 생성 (중복생성방지)
        // await paymentApi.payReady(ReservationData.id, formatReverseDate(state.selectedDate));
        const response = await paymentApi.payReady(
          ReservationData.id,
          formatReverseDate(state.selectedDate)
        );
        setReservationId(response._id);
      } catch (error) {
        console.error("예약 준비 중 오류가 발생했습니다.", error);
        alert("해당 일시에 예약이 이미 존재합니다.");

        setTimeout(() => {
          navigate(PATH.reservationPrepare(ReservationData.id), {
            state: { reservationData: ReservationData },
          });
        }, 2000);
      }
    };

    checkReservationAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 컴포넌트 마운트 시 1회만 실행

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // 토큰으로 확인해야 할 듯..?
      if (!user) {
        setError("로그인이 필요합니다.");
        return;
      }

      if (!selectedMethod) {
        setError("결제 방법을 선택해주세요.");
        return;
      }

      // const shortUuid = generateShortUuid();
      if (!reservationId) {
        setError("예약 준비 중 오류가 발생했습니다.");
        return;
      }
      const readyResponse = await paymentApi.ready({
        // reservation_id: shortUuid,
        reservation_id: reservationId,
        user_id: user.user_id,
        payment_method: selectedMethod === "BANK" ? "BANK" : "KAKAO_PAY",
        amount: state.servicePrice,
        status: "pending",
      });

      localStorage.setItem("tid", readyResponse.tid);
      localStorage.setItem("order_id", readyResponse.payment_id);

      const newReservationData: ReservationCreateRequest = {
        // reservation_id: shortUuid,
        reservation_id: reservationId,
        designer_id: ReservationData.id,
        user_id: user.user_id,
        reservation_date_time: formatReverseDate(state.selectedDate),
        consulting_fee: state.servicePrice.toString(),
        google_meet_link: "",
        mode: ReservationData.selectedMode,
        status: selectedMethod === "BANK" ? "결제대기" : "예약완료",
      };

      localStorage.setItem("reservation", JSON.stringify(newReservationData));
      localStorage.setItem("reservation_id", reservationId);

      if (selectedMethod === "BANK") {
        try {
          // 예약 생성 요청
          const reservationCreateResponse = await ReservationCreate(newReservationData);

          if (!reservationCreateResponse) {
            throw new Error("예약 생성에 실패했습니다.");
          }

          // 쿼리 무효화 및 새로고침
          try {
            await invalidateAndRefetchQueries(reservationCreateResponse.user_id);
          } catch (queryError) {
            console.error("쿼리 갱신 중 오류:", queryError);
            // 쿼리 갱신 실패는 크리티컬한 에러가 아니므로 계속 진행
          }

          // state 데이터 정리
          const transferPageState = {
            ...ReservationData,
            // reservation_id: shortUuid,
            reservation_id: reservationId,
            amount: state.servicePrice,
          };

          // 페이지 이동
          navigate(PATH.paymentBankTransfer, {
            state: transferPageState,
            replace: true, // history 스택 관리를 위해 replace 사용
          });
        } catch (bankError) {
          console.error("계좌이체 처리 중 오류:", bankError);
          setError(
            `계좌이체 처리 중 오류가 발생했습니다: ${
              bankError instanceof Error ? bankError.message : "알 수 없는 오류"
            }`
          );
          setLoading(false);
          return;
        }
      } else if (selectedMethod === "KAKAO") {
        // 카카오페이 결제 시 디바이스에 따른 리다이렉트
        const redirectUrl = isMobile()
          ? readyResponse.next_redirect_mobile_url
          : readyResponse.next_redirect_pc_url;

        window.location.href = redirectUrl;
        return;
      }
    } catch (error) {
      console.error("결제 처리 중 오류:", error);
      setError(error instanceof Error ? error.message : "결제 처리 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="결제 준비중..." />;
  }

  return (
    <div className="min-h-dvh pt-5">
      <header className="flex items-center justify-between mb-5 px-6">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <img src="/images/goToBack-icon.svg" alt="뒤로가기" />
        </div>
        {/* <h1 className="text-xl font-medium p-4 text-center">결제</h1> */}
        <button onClick={() => navigate(PATH.designerList)} className="text-gray-scale-300">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 10.8074V22C0 24.2091 1.79086 26 4 26H7.45455C8.55911 26 9.45455 25.1046 9.45455 24V17.1667C9.45455 16.0621 10.35 15.1667 11.4545 15.1667H14.5455C15.65 15.1667 16.5455 16.0621 16.5455 17.1667V24C16.5455 25.1046 17.4409 26 18.5455 26H22C24.2091 26 26 24.2091 26 22V10.8074C26 9.46999 25.3316 8.22106 24.2188 7.4792L15.2188 1.4792C13.8752 0.583469 12.1248 0.583469 10.7812 1.4792L1.7812 7.4792C0.668405 8.22106 0 9.46999 0 10.8074Z"
              fill="#D1D1D1"
            />
          </svg>
        </button>
      </header>
      {/* 예약 정보 */}
      <section className="px-6">
        <h3 className="text-sub-title font-bold mb-3">{ReservationData.name}</h3>
        <div className="flex flex-col gap-2">
          <p className="flex">
            <span className="w-24 text-body1 text-[#C3C3C3]">일정</span>
            <span>{formatReservationDate(state.selectedDate)}</span>
          </p>
          <p className="flex">
            <span className="w-24 text-body1 text-[#C3C3C3]">컨설팅 방식</span>
            <span>{ReservationData.selectedMode}</span>
          </p>
          <div className="my-2 w-full">
            <svg
              width="100%"
              height="5"
              viewBox="0 0 357 5"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 2.5C2.74167 0.5 4.48333 0.5 6.225 2.5C7.96667 4.5 9.70833 4.5 11.45 2.5C13.1917 0.5 14.9333 0.5 16.675 2.5C18.4167 4.5 20.1583 4.5 21.9 2.5C23.6417 0.5 25.3833 0.5 27.125 2.5C28.8667 4.5 30.6083 4.5 32.35 2.5C34.0917 0.5 35.8333 0.5 37.575 2.5C39.3167 4.5 41.0583 4.5 42.8 2.5C44.5417 0.5 46.2833 0.5 48.025 2.5C49.7667 4.5 51.5083 4.5 53.25 2.5C54.9917 0.5 56.7333 0.5 58.475 2.5C60.2167 4.5 61.9583 4.5 63.7 2.5C65.4417 0.5 67.1833 0.5 68.925 2.5C70.6667 4.5 72.4083 4.5 74.15 2.5C75.8917 0.5 77.6333 0.5 79.375 2.5C81.1167 4.5 82.8583 4.5 84.6 2.5C86.3417 0.5 88.0833 0.5 89.825 2.5C91.5667 4.5 93.3083 4.5 95.05 2.5C96.7917 0.5 98.5333 0.5 100.275 2.5C102.017 4.5 103.758 4.5 105.5 2.5C107.242 0.5 108.983 0.5 110.725 2.5C112.467 4.5 114.208 4.5 115.95 2.5C117.692 0.5 119.433 0.5 121.175 2.5C122.917 4.5 124.658 4.5 126.4 2.5C128.142 0.5 129.883 0.5 131.625 2.5C133.367 4.5 135.108 4.5 136.85 2.5C138.592 0.5 140.333 0.5 142.075 2.5C143.817 4.5 145.558 4.5 147.3 2.5C149.042 0.5 150.783 0.5 152.525 2.5C154.267 4.5 156.008 4.5 157.75 2.5C159.492 0.5 161.233 0.5 162.975 2.5C164.717 4.5 166.458 4.5 168.2 2.5C169.942 0.5 171.683 0.5 173.425 2.5C175.167 4.5 176.908 4.5 178.65 2.5C180.392 0.5 182.133 0.5 183.875 2.5C185.617 4.5 187.358 4.5 189.1 2.5C190.842 0.5 192.583 0.5 194.325 2.5C196.067 4.5 197.808 4.5 199.55 2.5C201.292 0.5 203.033 0.5 204.775 2.5C206.517 4.5 208.258 4.5 210 2.5"
                stroke="#C3C3C3"
              />
              <path
                d="M147 2.5C148.742 0.5 150.483 0.5 152.225 2.5C153.967 4.5 155.708 4.5 157.45 2.5C159.192 0.5 160.933 0.5 162.675 2.5C164.417 4.5 166.158 4.5 167.9 2.5C169.642 0.5 171.383 0.5 173.125 2.5C174.867 4.5 176.608 4.5 178.35 2.5C180.092 0.5 181.833 0.5 183.575 2.5C185.317 4.5 187.058 4.5 188.8 2.5C190.542 0.5 192.283 0.5 194.025 2.5C195.767 4.5 197.508 4.5 199.25 2.5C200.992 0.5 202.733 0.5 204.475 2.5C206.217 4.5 207.958 4.5 209.7 2.5C211.442 0.5 213.183 0.5 214.925 2.5C216.667 4.5 218.408 4.5 220.15 2.5C221.892 0.5 223.633 0.5 225.375 2.5C227.117 4.5 228.858 4.5 230.6 2.5C232.342 0.5 234.083 0.5 235.825 2.5C237.567 4.5 239.308 4.5 241.05 2.5C242.792 0.5 244.533 0.5 246.275 2.5C248.017 4.5 249.758 4.5 251.5 2.5C253.242 0.5 254.983 0.5 256.725 2.5C258.467 4.5 260.208 4.5 261.95 2.5C263.692 0.5 265.433 0.5 267.175 2.5C268.917 4.5 270.658 4.5 272.4 2.5C274.142 0.5 275.883 0.5 277.625 2.5C279.367 4.5 281.108 4.5 282.85 2.5C284.592 0.5 286.333 0.5 288.075 2.5C289.817 4.5 291.558 4.5 293.3 2.5C295.042 0.5 296.783 0.5 298.525 2.5C300.267 4.5 302.008 4.5 303.75 2.5C305.492 0.5 307.233 0.5 308.975 2.5C310.717 4.5 312.458 4.5 314.2 2.5C315.942 0.5 317.683 0.5 319.425 2.5C321.167 4.5 322.908 4.5 324.65 2.5C326.392 0.5 328.133 0.5 329.875 2.5C331.617 4.5 333.358 4.5 335.1 2.5C336.842 0.5 338.583 0.5 340.325 2.5C342.067 4.5 343.808 4.5 345.55 2.5C347.292 0.5 349.033 0.5 350.775 2.5C352.517 4.5 354.258 4.5 356 2.5"
                stroke="#C3C3C3"
              />
            </svg>
          </div>
          <p className="flex justify-between text-sub-title font-semibold">
            <span className="w-24">가격</span>
            <span className="text-[#D896FF]">
              {Intl.NumberFormat("ko-KR").format(Number(state.servicePrice))}원
            </span>
          </p>
        </div>
      </section>
      <hr className="my-5" />

      {/* 예약자 정보 */}
      <section className="px-6">
        <h3 className="text-sub-title font-bold mb-3">예약자 정보</h3>
        <div className="flex flex-col gap-2">
          <article className="border-2 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-scale-200 mb-1">이름</p>
            <p className="text-body1 text-gray-scale-400">{user?.name}</p>
          </article>
          <article className="border-2 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-scale-200 mb-1">이메일</p>
            <p className="text-body1 text-gray-scale-400">{user?.email}</p>
          </article>
        </div>
      </section>

      <div className="h-2 bg-[#F0F0F0] my-5"></div>

      {/* 결제수단 */}

      <section className="px-6">
        <h3 className="text-sub-title font-bold mb-3">결제 방법</h3>
        <div className="flex flex-col gap-2">
          <article
            className={`border-2 rounded-xl px-4 py-3 flex justify-between transition-all ${
              selectedMethod === "KAKAO" ? "border-[#D896FF]" : "border"
            }`}
            onClick={() => setSelectedMethod("KAKAO")}
          >
            <p
              className={`text-body1 text-gray-scale-400 flex gap-2 ${
                selectedMethod === "KAKAO" ? "font-bold" : ""
              }`}
            >
              <img src="/images/kakao-pay.png" alt="카카오페이" />
              카카오페이
            </p>
            <span>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width="20"
                  height="20"
                  rx="5"
                  fill={selectedMethod === "KAKAO" ? "#D896FF" : "#C3C3C3"}
                />
                <path
                  d="M5 10.5002L8.53583 14.036L15.6058 6.96436"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </article>
          <article
            className={`border-2 rounded-xl px-4 py-3 flex justify-between transition-all ${
              selectedMethod === "BANK" ? "border-[#D896FF]" : "border"
            }`}
            onClick={() => setSelectedMethod("BANK")}
          >
            <p
              className={`text-body1 text-gray-scale-400 ${
                selectedMethod === "BANK" ? "font-bold" : ""
              }`}
            >
              계좌이체
            </p>
            <span>
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.5"
                  width="20"
                  height="20"
                  rx="5"
                  fill={selectedMethod === "BANK" ? "#D896FF" : "#C3C3C3"}
                />
                <path
                  d="M5 10.5002L8.53583 14.036L15.6058 6.96436"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </article>
          {selectedMethod === "BANK" && (
            <div>
              <article
                className={`rounded-lg text-body1 px-4 py-3 mb-1 bg-[#D896FF]/10 flex flex-col gap-2`}
                onClick={() => setSelectedMethod("BANK")}
              >
                <div className="flex justify-between">
                  <p className="text-[#D896FF]">계좌</p>
                  <span className="underline">우리은행 1002059617442</span>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#D896FF]">예금주</p>
                  <span>블리스</span>
                </div>
              </article>
              <p className="text-body2 text-[#D896FF]">24시간내 미입금시 예약 자동 취소</p>
            </div>
          )}
        </div>
      </section>

      {/* 동의하기 */}
      <section className="mt-9 w-full px-8 py-7 bg-[#F0F0F0]">
        <ul className="list-disc text-xs text-gray-scale-300 flex flex-col gap-1">
          <li>
            컨설팅 예약 <span className="text-[#FF301A]">24시간 전까지</span> 취소시{" "}
            <span className="text-[#FF301A]">100% 취소/환불 가능</span>합니다.
          </li>
          <li>24시간이내에 결제 확인이 되지 않으면, 예약이 자동취소됩니다.</li>
          <li>
            <span className="text-[#FF301A]">노쇼의 경우 환불이 불가능합니다.</span>
          </li>
          <li>컨설팅 예약 변경의 경우 예약 취소 후 재예약 해야 가능합니다.</li>
        </ul>
      </section>

      {/* 하단 버튼 - fixed 제거하고 margin으로 간격 조정 */}
      <div className="min-w-[375px] max-w-[430px] m-auto p-4 px-6 bg-white border-t">
        <div>
          <button
            className="w-full h-12 bg-[#D896FF] rounded-xl text-white"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading
              ? "처리중..."
              : `${Intl.NumberFormat("ko-KR").format(Number(state.servicePrice))}원 결제하기`}
          </button>
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
