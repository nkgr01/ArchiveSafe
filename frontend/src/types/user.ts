export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
}
