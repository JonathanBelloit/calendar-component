import { auth } from "../config/firebase";

export const getCurrentUserEmail = (): string | null => {
  const user = auth.currentUser;
  return user ? user.email : null;
}

export const getCurrentUserId = (): string | null => {
  const user = auth.currentUser;
  return user ? user.uid : null;
}