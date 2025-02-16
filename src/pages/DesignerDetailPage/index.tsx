import { useParams } from "react-router-dom";
import DesignerDetail from "./components/DesignerDetail";
import DesignerDetailHeader from "./components/DesignerDetailHeader";

const DesignerDetailPage = () => {
  const { id } = useParams();

  return (
    <section>
      <DesignerDetailHeader />
      <DesignerDetail id={id} />
    </section>
  );
};

export default DesignerDetailPage;
