import { Button } from "./components/ui/button";

const Oauth = () => {
	const googleLogin = () => {
    const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
    
    // OAuth 2.0 파라미터 설정
    const params = {
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID, // 구글 콘솔에 등록된 클라이언트 ID
      redirect_uri: import.meta.env.VITE_GOOGLE_AUTH_REDIRECT_URI, // 구글 콘솔에 등록된 리다이렉트 URI
      response_type: 'token', // 토큰 반환 타입 
      scope: 'email profile', // 요청 권한
      access_type: 'online', // 액세스 타입
    };

    // URL 생성 및 리다이렉트
    const url = `${oauth2Endpoint}?${new URLSearchParams(params).toString()}`;
    window.location.href = url;
  }

  return (
    <div className="w-dvh h-dvh flex items-center justify-center">
      <Button onClick={googleLogin}>클릭!</Button>
    </div>
  );
};

export default Oauth;


