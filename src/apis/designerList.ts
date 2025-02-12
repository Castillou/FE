import axios from "axios";
import { LOCAL_ENDPOINT } from "./endpoints";


export const getDesignerList = async () => {
	try {
		const response = await axios.get(LOCAL_ENDPOINT.designers);

		return response.data;
	} catch (error) {
		// 추후 에러 핸들링 필요
		console.log(error)
	}
}
