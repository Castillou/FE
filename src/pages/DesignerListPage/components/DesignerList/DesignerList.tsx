import { Designer } from "@/types/apiTypes";
import DesignerItem from "./DesignerItem";

interface DesignerListProps {
  designers: Designer[];
}

const DesignerList = ({ designers }: DesignerListProps) => {
  return (
    <ul className="flex flex-col">
      {designers.map((designer) => (
        <DesignerItem key={designer.id} designer={designer} />
      ))}
    </ul>
  );
};

export default DesignerList;
