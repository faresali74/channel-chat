import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

import * as authApi from "../services/authApi";
import type {
  AuthContextValue,
  LoginRequest,
  RegisterRequest,
} from "../types/auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  const accessTokenRef = useRef<string | null>(null);

  const updateAccessToken = (token: string | null) => {
    accessTokenRef.current = token;
    setAccessToken(token);
  };

  async function login(data: LoginRequest) {
    const response = await authApi.login(data);

    updateAccessToken(response.accessToken);
    setDisplayName(response.displayName);

    return response;
  }

  async function register(data: RegisterRequest) {
    return authApi.register(data);
  }

  async function logout() {
    try {
      if (accessTokenRef.current) {
        await authApi.logout(accessTokenRef.current);
      }
    } finally {
      updateAccessToken(null);
      setDisplayName(null);
    }
  }

  async function refreshAccessToken() {
    const response = await authApi.refresh();

    updateAccessToken(response.accessToken);
    setDisplayName(response.displayName);

    return response.accessToken;
  }

  const value: AuthContextValue = {
    accessToken,
    displayName,
    login,
    register,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
