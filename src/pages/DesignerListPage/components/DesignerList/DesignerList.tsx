import { Designer } from "@/types/apiTypes";
import DesignerItem from "./DesignerItem";

interface DesignerListProps {
  designers: Designer[];
}

const DesignerList = ({ designers }: DesignerListProps) => {
  return (
    <div className="flex flex-col">
      {designers.map((designer) => (
        <DesignerItem key={designer.id} designer={designer} />
      ))}
    </div>
  );
};

export default DesignerList;
