import { auth } from "../config/firebase";

export const getCurrentUserEmail = (): string | null => {
  const user = auth.currentUser;
  return user ? user.email : null;
}