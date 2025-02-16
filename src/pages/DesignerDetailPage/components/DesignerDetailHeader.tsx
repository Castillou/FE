import { useNavigate } from "react-router-dom";

const DesignerDetailHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center h-[75px] px-7">
      <div
        onClick={() => {
          navigate(-1);
        }}
        className="cursor-pointer"
      >
        <img src="/images/goToBack-icon.svg" alt="뒤로가기" />
      </div>
      <div>
        <div
          className="cursor-pointer"
          onClick={() => {
            alert("홉 버튼 클릭");
          }}
        >
          <img src="/images/home-icon.svg" alt="홈" />
        </div>
      </div>
    </header>
  );
};

export default DesignerDetailHeader;
