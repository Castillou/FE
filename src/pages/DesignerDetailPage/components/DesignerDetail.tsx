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
import designerModeFormat from "@/utils/designerModeFormat";

interface DesignerDetailProps {
  id: string | undefined;
}

const DesignerDetail = ({ id }: DesignerDetailProps) => {
  const navigate = useNavigate();

  const [data, setData] = useState<DesignerDetailResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [reservationData, setReservationData] = useState<ReservationData | null>(null);

  const handleModeSelect = (mode: DesignerMode) => {
    setReservationData(
      (prev) => prev && { ...prev, selectedMode: prev.selectedMode === mode ? null : mode }
    );
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const handleVideoClick = (url: string) => {
    setSelectedVideo(url);
    setDialogOpen(true);
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
            src={data?.profile_image}
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/68x68?text=haertz";
            }}
            alt="designer image"
            className="object-cover rounded-md w-[68px] h-[68px]"
          />
        </div>

        <div className="">
          <h4 className="text-[12px] text-primary-200">주파수 지수</h4>
          <div className="bg-primary-100/20 h-[10px] w-full relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary-100 w-[50%]"
              style={{ width: `${frequency}%` }}
            ></div>
          </div>
        </div>

        <div className="w-full h-[9px] bg-selected-default my-12"></div>

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

        <div className="mb-[22px]">
          <h4 className="font-bold mb-[10px]">컨설팅 방식</h4>
          <div className="flex gap-2">
            {designerModeFormat(data?.available_modes as DesignerMode)?.map((mode) => (
              <div className="bg-[#f4f4f4] rounded-full px-3 py-[2px] whitespace-nowrap" key={mode}>
                <span className="text-[11px]">{mode}</span>
              </div>
            ))}
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
            {[
              {
                src: "https://www.youtube.com/embed/vTLOL4vH8qA?controls=0&showinfo=0&rel=0&modestbranding=0&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&mute=1",
              },
              {
                src: "https://www.youtube.com/embed/NXx8-vTI29M?controls=0&showinfo=0&rel=0&modestbranding=0&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&mute=1",
              },
              {
                src: "https://www.youtube.com/embed/e29QHnPOzUE?controls=0&showinfo=0&rel=0&modestbranding=0&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&mute=1",
              },
              {
                src: "https://www.youtube.com/embed/N9eSAvR4e3g?controls=0&showinfo=0&rel=0&modestbranding=0&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&mute=1",
              },
              {
                src: "https://www.youtube.com/embed/QOXfzz8U8sQ?controls=0&showinfo=0&rel=0&modestbranding=0&iv_load_policy=3&fs=0&cc_load_policy=0&playsinline=1&mute=1",
              },
            ].map((video, index) => (
              <div
                key={index}
                className="embla__slide flex-[0_0_auto] min-w-0 mr-[9px] cursor-pointer"
                onClick={() => handleVideoClick(`${video.src}&autoplay=1`)}
              >
                <iframe
                  width="82"
                  height="147"
                  src={video.src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="rounded-md pointer-events-none"
                  loading="lazy"
                ></iframe>
              </div>
            ))}
          </Container>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="p-0 overflow-hidden min-w-[350px] max-w-[450px] m-auto">
            {selectedVideo && (
              <iframe
                width="100%"
                height="600px"
                src={selectedVideo}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-md"
              ></iframe>
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
