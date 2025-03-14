/// <reference types="vite/client" />
interface ImportMeta {
  env: {
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_GOOGLE_CLIENT_SECRET: string;
    VITE_GOOGLE_AUTH_REDIRECT_URI: string;
    VITE_SECRET_KEY_DEV: string;
  };
}
