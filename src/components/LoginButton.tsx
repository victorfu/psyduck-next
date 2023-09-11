"use client";

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import AnalyticsHelper from "@/lib/analytics-helper";

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
        AnalyticsHelper.getInstance().logEvent("login", "click");
        setLoading(true);
        signInByGoogle();
      }}
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
