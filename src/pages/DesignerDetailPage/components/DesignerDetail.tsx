import { getDesignerDetail } from "@/apis/designerDetail";
import { Button } from "@/components/ui/button";
import { DesignerDetailResponse } from "@/types/apiTypes";
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { DesignerMode, ReservationData } from "@/types/types";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import Container from "./Container";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DesignerDetailProps {
  id: string | undefined;
}

const DesignerDetail = ({ id }: DesignerDetailProps) => {
  const navigate = useNavigate();

  const [data, setData] = useState<DesignerDetailResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleModeSelect = (mode: DesignerMode) => {
    setReservationData(
      (prev) => prev && { ...prev, selectedMode: prev.selectedMode === mode ? null : mode }
    );
  };

  //주파수 지수
  const frequency = 70;

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
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const availableModes = data?.available_modes.split(", ") as DesignerMode[];

  const goToReservation = () => {
    if (reservationData?.selectedMode) {
      navigate(PATH.reservationPrepare(id), { state: { reservationData } });
    }
  };

  return (
    <>
      <div className="px-5 pt-[25px] bg-white">
        <div className="flex justify-between items-center mb-[12px]">
          <div>
            <p className="text-[20px] font-bold mb-[6px]">{data?.name}</p>
            <p className="text-[14px] text-[#676767]">{data?.introduction}</p>
          </div>
          <img
            src="https://placehold.co/53x53?text=haertz"
            alt="designer image"
            className="object-cover rounded-full"
          />
        </div>

        <div className="mb-[85px]">
          <h4 className="text-[12px] text-primary-200">주파수 지수</h4>
          <div className="bg-primary-100/20 h-[10px] w-full relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary-100 w-[50%]"
              style={{ width: `${frequency}%` }}
            ></div>
          </div>
        </div>

        <div className="text-[14px] text-[#676767] mb-[22px]">{data?.introduction}</div>

        <div className="mb-[22px]">
          <h4 className="font-bold mb-[10px]">전문분야</h4>
          <div>
            <div className="bg-[#F6E7FF] rounded-full px-[13px] py-[2px] inline-block">
              <span className="text-[11px] text-primary-200 whitespace-nowrap">
                {data?.specialties} 전문
              </span>
            </div>
          </div>
        </div>

        <div className="pb-[35px] border-b border-[#F0F0F0] mb-[27px]">
          <p className="font-bold mb-[10px]">샵 주소</p>
          <div className="px-4 py-[10px] border border-[#F0F0F0] rounded-[6px] flex items-center gap-[10px]">
            <img src="/images/pointer-icon.svg" alt="위치" />
            <p className="text-[14px] text-[#676767]">{data?.shop_address}</p>
          </div>
        </div>

        <div className="mb-[73px]">
          <h4 className="font-bold mb-[10px]">포트폴리오</h4>

          <Container>
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_auto] min-w-0 mr-[9px] cursor-pointer"
                onClick={() =>
                  setSelectedImage(`https://placehold.co/82x147?text=haertz ${index + 1}`)
                }
              >
                <img
                  src={`https://placehold.co/82x147?text=haertz ${index + 1}`}
                  alt={`portfolio image ${index + 1}`}
                  className="object-cover w-[82px] h-[147px]"
                />
              </div>
            ))}
          </Container>
        </div>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="p-0 overflow-hidden">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="확대된 이미지"
                className="w-full h-full object-contain"
              />
            )}
          </DialogContent>
        </Dialog>

        <div>
          <Button
            className="bg-primary-200 text-white w-full text-[20px] font-bold py-[14px] h-[50px] transition-colors duration-200 hover:bg-primary-300"
            onClick={() => setOpen(true)}
          >
            예약하기
          </Button>
        </div>
      </div>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="min-w-[375px] max-w-[430px] m-auto px-[18px] pb-[18px]">
          <DrawerHeader className="pb-4 pl-0">
            <DrawerTitle className="text-[16px] font-bold text-left">
              컨설팅 방식을 선택해주세요.
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex flex-col gap-[10px] mb-1">
            {availableModes?.includes("대면") ? (
              <div
                className={`p-3 cursor-pointer rounded-md border ${
                  reservationData?.selectedMode === "대면"
                    ? "border border-primary-100 bg-secondary-100"
                    : "bg-[#F0F0F0]"
                }`}
                onClick={() => {
                  handleModeSelect("대면");
                }}
              >
                <span className="text-[16px] font-bold">대면 </span>
                <span className="text-[16px]">{data?.face_consulting_fee.toLocaleString()}원</span>
                <p className="text-[10px] text-gray-scale-300">실제 샵에 방문하여 컨설팅 진행</p>
              </div>
            ) : (
              <div
                className={
                  "p-3 min-h-[65px] cursor-pointer bg-[#F0F0F0] flex items-center rounded-md"
                }
              >
                <span className="text-[14px] font-bold">비대면만 가능합니다</span>
              </div>
            )}

            {availableModes?.includes("비대면") ? (
              <div
                className={`p-3 cursor-pointer rounded-md border ${
                  reservationData?.selectedMode === "비대면"
                    ? "border border-primary-100 bg-secondary-100"
                    : "bg-[#F0F0F0]"
                }`}
                onClick={() => {
                  handleModeSelect("비대면");
                }}
              >
                <span className="text-[16px] font-bold">비대면 </span>
                <span className="text-[16px]">
                  {data?.non_face_consulting_fee.toLocaleString()}원
                </span>
                <p className="text-[10px] text-gray-scale-300">
                  예약 완료 후 Google Meet 링크가 생성되어 화상 컨설팅 진행
                </p>
              </div>
            ) : (
              <div
                className={
                  "p-3 min-h-[65px] cursor-pointer bg-[#F0F0F0] flex items-center rounded-md"
                }
              >
                <span className="text-[14px] font-bold">대면만 가능합니다</span>
              </div>
            )}
          </div>

          <DrawerFooter className="h-[88px] bg-white">
            <Button
              className="bg-primary-200 text-white w-full text-[20px] font-bold py-[14px] h-[50px] transition-colors duration-200 hover:bg-primary-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!reservationData?.selectedMode}
              onClick={goToReservation}
            >
              다음
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DesignerDetail;
