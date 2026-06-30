export interface AuthResponse {
  message: string;
  access_token: string;
  token_type: string;
  user: User;
}

import { User } from './user';
