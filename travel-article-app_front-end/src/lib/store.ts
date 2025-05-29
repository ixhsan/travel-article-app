import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/user.type";

type LocalUser = Omit<User, "password" | "email">;
interface AuthStore {
  user: LocalUser | null;
  isAuthenticated: boolean;
  login: (user: LocalUser) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (user: LocalUser) => {
        set({
          user: {
            id: user.id,
            name: user.name,
          },
          isAuthenticated: true,
        });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
