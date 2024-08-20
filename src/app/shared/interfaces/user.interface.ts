export interface User {
  email: string;
  id: string;
  name: string;
  role: string;
}

export interface UserLoginResponse {
  user: User;
  token: string;
}
