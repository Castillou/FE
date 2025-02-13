import { getDesignerList } from "@/apis/designerList";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import DesignerList from "./components/DesignerList";
import { getReservationList } from "@/apis/reservation";
import { useMemo, useState } from "react";
import { Reservation } from "@/types/apiTypes";
import dayjs from "dayjs";
import ReservationItem from "./components/ReservationItem";
import { formatDate } from "@/utils/dayFormat";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DesignerFilterDrawer from "./components/DesignerFilterDrawer";
import { FilterOptions } from "@/types/types";
import FilteredOptionBox from "./components/filteredOptionbox";

const DesignerListPage = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    designer_mode: ["대면", "비대면"],
    designer_location: ["홍대/연남/합정"],
  });

  const { data: designerData, isPending: designerPending } = useQuery({
    queryKey: QUERY_KEY.designer.list,
    queryFn: getDesignerList,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  // console.log(designerData);

  const user_id = "67ab499ba706f516fb348ddd";

  const { data: reservationsData, isPending: reservationPending } = useQuery({
    queryKey: QUERY_KEY.reservationList.list(user_id),
    queryFn: () => getReservationList(user_id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const upcomingReservations = useMemo(() => {
    if (!reservationsData) return [];

    const now = dayjs("2025-04-20 12:01");

    const thirtyMinutesLater = now.add(30, "minute");

    return reservationsData.filter((reservation: Reservation) => {
      const reservationTime = formatDate(reservation.reservation_date_time);

      return (
        reservation.status !== "예약취소" && // 취소된 예약 제외
        reservationTime.isAfter(now) && // 현재 시간 이후
        reservationTime.isBefore(thirtyMinutesLater) // 30분 이내
      );
    });
  }, [reservationsData]);

  return (
    <>
      {reservationPending && <div>Loading...</div>}
      {upcomingReservations.length === 0 && <div>30분 이내 예약 없음</div>}
      {upcomingReservations.length > 0 && (
        <ReservationItem reservationData={upcomingReservations[0]}></ReservationItem>
      )}

      <div>
        {designerPending ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full">
            <Drawer>
              <div className="w-full flex justify-between px-8 py-4 border-b border-gray-200">
                <div className="flex gap-2">
                  {filterOptions.designer_mode?.map((option) => (
                    <FilteredOptionBox key={option} option={option}></FilteredOptionBox>
                  ))}
                  {filterOptions.designer_location?.map((option) => (
                    <FilteredOptionBox key={option} option={option}></FilteredOptionBox>
                  ))}
                </div>

                <DrawerTrigger>
                  <div>
                    <img src="images/mage_filter.svg" alt="필터" />
                  </div>
                </DrawerTrigger>
              </div>

              <DesignerList designers={designerData.designer_list} />

              <DrawerContent className="max-w-[375px] m-auto px-[18px] pb-[18px]">
                <DesignerFilterDrawer />
                <DrawerFooter>
                  <DrawerClose>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </>
  );
};

export default DesignerListPage;
