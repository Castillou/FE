import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full pt-7 px-4 mb-7">
      <Link
        to="/"
        className="block w-[117px] h-[29px] bg-[url('images/main-logo.png')] bg-contain bg-no-repeat bg-center"
      ></Link>
    </header>
  );
};

export default Header;
