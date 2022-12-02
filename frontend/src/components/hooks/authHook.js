import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userName, setuserName] = useState("");

  const login = useCallback((token, userId, userName) => {
    setToken(token);
    setUserId(userId);
    setuserName(userName);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
        userName: userName,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);

    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return { token, login, userId, logout, userName };
};
