import { apiRequest } from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

// Register a new user

export function register(data: RegisterRequest) {
  return apiRequest<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

// Login an existing user

export function login(data: LoginRequest) {
  return apiRequest<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function refresh() {
  return apiRequest<LoginResponse>("/api/auth/refresh", {
    method: "POST",
  });
}

export function logout(accessToken: string) {
  return apiRequest<void>("/api/auth/logout", {
    method: "POST",
    accessToken,
  });
}
