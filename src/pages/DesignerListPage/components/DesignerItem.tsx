import { Designer } from "@/types/apiTypes";

interface DesignerItemProps {
	designer: Designer;
}

const DesignerItem = ({designer}: DesignerItemProps) => {
	return (
		<div className="border-b border-gray-200 py-2 px-2 bg-white rounded-e-sm">
			<div className="flex items-center">
				<img
						src="https://placehold.co/58x58?text=haertz"
						alt="designer image"
						className="object-cover rounded-[50%]"
					/>
				<h3 className="ml-4">{designer.name}</h3>
			</div>
		</div>
	)
}

export default DesignerItem;
