import { getDesignerList } from "@/apis/designerList";
import QUERY_KEY from "@/constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import DesignerList from "./components/DesignerList";
import Footer from "@/components/common/Footer";

const DesignerListPage = () => {
	const { data, isPending } = useQuery({
		queryKey: QUERY_KEY.designer.list,
		queryFn: getDesignerList,
	})
	
	return (
		<>
			<div>
			{isPending ? (
				<div>Loading...</div>
			) : (
				<div className="w-full p-1">
					<DesignerList designers={data}/>
				</div>
			)}

				<Footer />
			</div>
		</>
	);
};

export default DesignerListPage;