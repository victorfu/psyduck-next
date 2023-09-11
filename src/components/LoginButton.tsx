"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

const LoginButton = () => {
  const { user, signInByGoogle } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      window.location.reload();
    }
  }, [user]);

  return loading ? (
    <div>loading...</div>
  ) : (
    <button
      onClick={() => {
        setLoading(true);
        signInByGoogle();
      }}
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
