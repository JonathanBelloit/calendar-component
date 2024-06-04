import { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, User, createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  const register = async (email: string, password: string) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredentials.user;
    await addDoc(collection(db, `users/${user.email}/userData`), {
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
    });
  }
  return (
    <AuthContext.Provider value={{ user, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };