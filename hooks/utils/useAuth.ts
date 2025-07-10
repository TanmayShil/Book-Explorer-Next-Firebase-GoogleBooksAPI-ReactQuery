import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getIdToken } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { setAuthCookie, clearAuthCookie } from '@/hooks/utils/setAuthCookie';

export const useAuth = () => {
  const signup = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();
    setAuthCookie(token);
  };

  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const token = await user.getIdToken();
    setAuthCookie(token);
  };

  const logout = async () => {
    await signOut(auth);
    clearAuthCookie();
  };

  return { signup, login, logout };
};
