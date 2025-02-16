import { getDesignerDetail } from "@/apis/designerDetail";
import { Button } from "@/components/ui/button";
import { Designer } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DesignerMode, ReservationData } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

interface DesignerDetailProps {
  id: string | undefined;
}

const DesignerDetail = ({ id }: DesignerDetailProps) => {
  const navigate = useNavigate();

  const [data, setData] = useState<Designer | null>(null);
  const [open, setOpen] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);

  const handleModeSelect = (mode: DesignerMode) => {
    setReservationData(
      (prev) => prev && { ...prev, selectedMode: prev.selectedMode === mode ? null : mode }
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          throw new Error("잘못된 접근입니다.");
        }

        const reponse = await getDesignerDetail(id);

        setData(reponse);

        setReservationData({
          ...reponse,
          selectedMode: null,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(data);

  const availableModes = data?.available_modes.split(", ") as DesignerMode[];

  console.log(availableModes);

  const goToReservation = () => {
    if (reservationData?.selectedMode) {
      navigate(PATH.reservationPrepare(id), { state: { reservationData } });
    }
  };

  return (
    <>
      <div>
        <img
          src="https://placehold.co/393x250?text=haertz"
          alt="designer image"
          className="object-cover rounded-md w-full"
        />
      </div>

      <div className="px-7 pt-[25px] bg-white">
        <div className="flex justify-between items-center mb-[22px]">
          <div className="text-[20px] font-bold">{data?.name}</div>
          <div className="cursor-pointer" onClick={() => alert("좋아요 기능 준비중입니다.")}>
            <img src="/images/heart-icon.svg" alt="좋아요" />
          </div>
        </div>

        <div className="text-[14px] text-[#676767] mb-[22px]">{data?.introduction}</div>

        <div className="mb-[22px]">
          <p className="font-bold mb-[10px]">전문분야</p>
          <div>
            <div className="bg-[#F6E7FF] rounded-full px-[13px] py-[2px] inline-block">
              <span className="text-[11px] text-[#B434FF] whitespace-nowrap">
                {data?.specialties} 전문
              </span>
            </div>
          </div>
        </div>

        <div className="mb-[185px]">
          <p className="font-bold mb-[10px]">샵 주소</p>
          <div className="px-4 py-[10px] border border-[#F0F0F0] rounded-[6px] flex items-center gap-[10px]">
            <img src="/images/pointer-icon.svg" alt="위치" />
            <p className="text-[14px] text-[#676767]">{data?.shop_address}</p>
          </div>
        </div>

        <div>
          <Button
            className="bg-[#B434FF] text-white w-full text-[20px] font-bold py-[14px] h-[50px] transition-colors duration-200 hover:bg-[#9929CC]"
            onClick={() => setOpen(true)}
          >
            예약하기
          </Button>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="min-w-[375px] max-w-[430px] m-auto px-[18px] pb-[18px]">
          <DrawerHeader>
            <DrawerTitle className="text-[16px] font-bold">컨설팅 방식</DrawerTitle>
            <DrawerDescription className="text-[12px] text-[#868686] leading-4">
              소요시간 약 30분
              <br />
              컨설팅 내용은 진행 후 요약된 리포트로 고객에게 전달됩니다.
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex gap-2 text-center pb-[30px]">
            {availableModes?.includes("대면") ? (
              <div
                className={`py-4 px-4 w-[50%] cursor-pointer flex items-center justify-center flex-col ${
                  reservationData?.selectedMode === "대면"
                    ? "bg-[#B434FF] text-white"
                    : "bg-[#F0F0F0]"
                }`}
                onClick={() => {
                  handleModeSelect("대면");
                }}
              >
                <p className="text-[14px]">대면</p>
                <p className="text-[12px]">{data?.face_consulting_fee.toLocaleString()}원~</p>
              </div>
            ) : (
              <div
                className={
                  "py-4 px-4 w-[50%] cursor-pointer bg-[#F0F0F0] flex items-center justify-center flex-col"
                }
              >
                <p className="text-[14px]">비대면만 가능합니다</p>
              </div>
            )}

            {availableModes?.includes("비대면") ? (
              <div
                className={`py-4 px-4 w-[50%] cursor-pointer flex items-center justify-center flex-col ${
                  reservationData?.selectedMode === "비대면"
                    ? "bg-[#B434FF] text-white"
                    : "bg-[#F0F0F0]"
                }`}
                onClick={() => {
                  handleModeSelect("비대면");
                }}
              >
                <p className="text-[14px]">비대면</p>
                <p className="text-[12px]">{data?.face_consulting_fee.toLocaleString()}원~</p>
              </div>
            ) : (
              <div
                className={
                  "py-4 px-4 w-[50%] cursor-pointer bg-[#F0F0F0] flex items-center justify-center flex-col"
                }
              >
                <p className="text-[14px]">대면만 가능합니다</p>
              </div>
            )}
          </div>

          <DrawerFooter className="h-[88px] bg-white">
            <Button
              className="bg-[#B434FF] text-white w-full text-[20px] font-bold py-[14px] h-[50px] transition-colors duration-200 hover:bg-[#9929CC] disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!reservationData?.selectedMode}
              onClick={goToReservation}
            >
              계속하기
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DesignerDetail;
