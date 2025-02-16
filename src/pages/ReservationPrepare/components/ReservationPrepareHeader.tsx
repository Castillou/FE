import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

const ReservationPrepareHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between mb-5">
      <div onClick={() => navigate(-1)}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.875 12.4999H3.125M3.125 12.4999L11.9792 3.64575M3.125 12.4999L11.9792 21.3541"
            stroke="black"
            strokeWidth="1.14583"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
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
  );
};
export default ReservationPrepareHeader;
