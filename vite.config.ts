import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@public", replacement: "/public" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@components", replacement: "/src/components" },
    ],
  },server: {
    proxy: {
      "/auth": {  // 구글 OAuth 엔드포인트를 위한 프록시 설정
        target: "https://accounts.google.com/o/oauth2/v2",
        changeOrigin: true,
        secure: false,
      },
      '/v1': {
        target: 'https://kapi.kakao.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },

});
