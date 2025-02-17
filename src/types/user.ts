export interface UserMeResponse {
  email: string;
  google_id: string;
  name: string;
  profile_image: string;
  provider: string; // e.g., "google"
  status: string; // e.g., "active"
  user_id: string;
  created_at: string;
  updated_at: string;
}
