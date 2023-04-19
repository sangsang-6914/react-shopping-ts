import React, { createContext, useContext, useEffect, useState } from 'react';
import { checkLoginUser, login, logout } from '../api/firebase';

interface IUser {
  email: string;
  photoURL: string;
  displayName: string;
  uid: string;
  isAdmin: boolean;
}

const AuthContext = createContext<any>(null);

function AuthContextProvider({ children }: any) {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    checkLoginUser((user: any) => {
      setUser(user);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContextProvider;
