import axios from 'axios';
import { Button } from "./components/ui/button";

const KakaoTest = () => {

	const handleKakaoPay = async () => {
		try {
			const response = await axios.post(
				'https://open-api.kakaopay.com/',
				{
					cid: 'TC0ONETIME',
					partner_order_id: 'test_order_id',
					partner_user_id: 'test_user_id',
					item_name: '테스트 상품',
					quantity: 1,
					total_amount: 1000,
					tax_free_amount: 0,
					approval_url: 'https://www.naver.com/',
					cancel_url: 'https://www.google.com/',
					fail_url: 'https://www.daum.net/',
				},
				{
					headers: {
						'Authorization': `DEV_SECRET_KEY ${import.meta.env.VITE_SECRET_KEY_DEV}`,
						'Content-Type': 'application/json',
					},
				}
			);

			// 결제 페이지로 리다이렉트
			window.location.href = response.data.next_redirect_pc_url;
			
		} catch (error) {
			console.error('카카오페이 요청 실패:', error);
			alert('결제 요청에 실패했습니다.');
		}
	};

	return <div>
		<Button onClick={handleKakaoPay}>카카오 결제 테스트</Button>
	</div>;
};

export default KakaoTest;


