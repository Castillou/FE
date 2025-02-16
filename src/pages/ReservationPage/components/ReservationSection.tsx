import { useLocation } from "react-router-dom";

const ReservationSection = () => {
  const { state } = useLocation();

  const reservationData = state?.reservationData;

  console.log(reservationData);

  return <div>ReservationSection</div>;
};

export default ReservationSection;
