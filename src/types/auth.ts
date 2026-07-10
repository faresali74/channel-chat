export interface RegisterRequest {
  username: string;
  password: string;
  displayName: string;
}

export interface RegisterResponse {
  message: string;
  username: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  displayName: string;
}

export interface AuthContextValue {
  accessToken: string | null;
  displayName: string | null;

  login: (data: LoginRequest) => Promise<LoginResponse>;

  register: (data: RegisterRequest) => Promise<RegisterResponse>;

  logout: () => Promise<void>;

  refreshAccessToken: () => Promise<string>;
}
