import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full pt-7 px-4 mb-7">
      <Link to="/">
        <img src="/images/main-logo.png" alt="haertz logo" />
      </Link>
    </header>
  );
};

export default Header;
