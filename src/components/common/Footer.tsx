import { PATH } from "@/constants/path";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full max-w-[430px] bg-white py-4 border-t-[2px] border-gray-100 mt-2">
      <nav>
        <ul className="flex justify-between">
          <li className="w-1/4">
            <NavLink
              to={PATH.designerList}
              className="flex flex-col pt-[2px] items-center gap-1 justify-between"
            >
              {({ isActive }) => (
                <>
                  <div>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10.8074V22C0 24.2091 1.79086 26 4 26H7.45455C8.55911 26 9.45455 25.1046 9.45455 24V17.1667C9.45455 16.0621 10.35 15.1667 11.4545 15.1667H14.5455C15.65 15.1667 16.5455 16.0621 16.5455 17.1667V24C16.5455 25.1046 17.4409 26 18.5455 26H22C24.2091 26 26 24.2091 26 22V10.8074C26 9.46999 25.3316 8.22106 24.2188 7.4792L15.2188 1.4792C13.8752 0.583469 12.1248 0.583469 10.7812 1.4792L1.7812 7.4792C0.668405 8.22106 0 9.46999 0 10.8074Z"
                        fill={isActive ? "#C96EFF" : "#A0A0A0"}
                      />
                    </svg>
                  </div>
                  <span className="text-[11px]">홈</span>
                </>
              )}
            </NavLink>
          </li>
          <li className="w-1/4">
            <NavLink
              to={PATH.reservationList}
              className="flex flex-col items-center gap-1 justify-between"
            >
              {({ isActive }) => (
                <>
                  <div>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 4.66671V2.33337M17.5 4.66671V7.00004M17.5 4.66671H12.25M3.5 11.6667V22.1667C3.5 23.4554 4.54467 24.5 5.83333 24.5H22.1667C23.4554 24.5 24.5 23.4554 24.5 22.1667V11.6667H3.5Z"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3.5 11.6666V6.99996C3.5 5.71129 4.54467 4.66663 5.83333 4.66663H8.16667"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.16699 2.33337V7.00004"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24.4997 11.6666V6.99996C24.4997 5.71129 23.455 4.66663 22.1663 4.66663H21.583"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-[11px] ${isActive ? "text-[#C96EFF]" : "text-gray-scale-200"}`}
                  >
                    예약목록
                  </span>
                </>
              )}
            </NavLink>
          </li>
          <li className="w-1/4">
            <NavLink to={PATH.mypage} className="flex flex-col items-center gap-1 justify-between">
              {({ isActive }) => (
                <>
                  <div>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83301 23.3333V22.1667C5.83301 17.6563 9.48935 14 13.9997 14C18.51 14 22.1663 17.6563 22.1663 22.1667V23.3333"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.9997 14C16.577 14 18.6663 11.9106 18.6663 9.33329C18.6663 6.75596 16.577 4.66663 13.9997 4.66663C11.4223 4.66663 9.33301 6.75596 9.33301 9.33329C9.33301 11.9106 11.4223 14 13.9997 14Z"
                        stroke={isActive ? "#C96EFF" : "#A0A0A0"}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-[11px] ${isActive ? "text-[#C96EFF]" : "text-gray-scale-200"}`}
                  >
                    마이페이지
                  </span>
                </>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
