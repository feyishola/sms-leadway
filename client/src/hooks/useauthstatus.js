import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData) {
      setIsloggedIn(true);
    }
    setLoading(false);
  }, [userData]);
  return { isLoggedIn, isLoading };
};

export default useAuthStatus;
