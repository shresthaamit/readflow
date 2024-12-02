import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // Update logged-in status whenever the token changes
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
