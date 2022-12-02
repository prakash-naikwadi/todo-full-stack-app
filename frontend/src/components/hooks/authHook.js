import { useState, useCallback, useEffect } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((token, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: token,
      })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return { token, login, userId };
};
