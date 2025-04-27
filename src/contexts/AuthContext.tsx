// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { User, AuthContextType } from '../types';
// import { users } from '../utils/mockData';

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState<User | null>(null);

//   useEffect(() => {
//     // Check for saved login on component mount
//     const savedUser = localStorage.getItem('currentUser');
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (username: string, password: string): boolean => {
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       setCurrentUser(user);
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       return true;
//     }

//     return false;
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
//   };

//   const isAuthenticated = currentUser !== null;
//   const isAdmin = currentUser?.role === 'admin';

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated, isAdmin }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

import React, { createContext, useState, useContext, useEffect } from "react";
import { User, AuthContextType } from "../types";
import { login as loginApi } from "../services/user"; // Usamos tu función login

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const data = await loginApi(email, password);

      const user: User = {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        rol: data.user.rol, // Aquí sí está bien usar data.user.rol
      };

      console.log("User data:", user);

      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("jwt", data.jwt);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("jwt");
  };

  const isAuthenticated = currentUser !== null;
  const isAdmin = currentUser?.rol === "Admin";

  return (
    <AuthContext.Provider
      value={{ currentUser, login, logout, isAuthenticated, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
