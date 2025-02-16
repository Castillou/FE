import { PATH } from "@/constants/path";
import { DesignerListPage } from "@/pages";
import DesignerDetailPage from "@/pages/DesignerDetailPage";

const DESIGNER_ROUTES = [
  {
    path: PATH.designerList,
    element: <DesignerListPage />,
  },
  {
    path: PATH.designerDetailPath,
    element: <DesignerDetailPage />,
  },
];

export default DESIGNER_ROUTES;
