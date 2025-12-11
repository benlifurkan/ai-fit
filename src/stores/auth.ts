// src/stores/auth.ts
import { ref } from "vue";

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  height?: string | null;
  weight?: string | null;
  bodyType?: string | null;
  skinTone?: string | null;
  hairColor?: string | null;
  role?: "user" | "admin";
}

const stored = localStorage.getItem("aifit_user");
const initialUser: AuthUser | null = stored ? JSON.parse(stored) : null;

export const currentUser = ref<AuthUser | null>(initialUser);

export function setUser(user: AuthUser | null) {
  currentUser.value = user;
  if (user) {
    localStorage.setItem("aifit_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("aifit_user");
  }
}
