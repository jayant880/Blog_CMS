import { create } from "zustand";

interface User {
  id: string;
  username: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user?: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Check local storage initially
  const storedToken = localStorage.getItem("token");

  return {
    user: null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,

    login: (token, user) => {
      localStorage.setItem("token", token);
      set({ token, isAuthenticated: true, user: user || null });
    },

    logout: () => {
      localStorage.removeItem("token");
      set({ token: null, isAuthenticated: false, user: null });
    },
  };
});
