export interface Url {
  id: string;
  original_url: string;
  short_url: string;
  short_code: string;
  clicks: number;
  created_at: string;
  expires_at: string | null;
}
