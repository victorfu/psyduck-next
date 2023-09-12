"use client";

import { useContext, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import AnalyticsHelper from "@/lib/analytics-helper";
import LoadingSpinner from "./LoadingSpinner";

const LoginButton = () => {
  const { signInByGoogle } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <button
      onClick={async () => {
        AnalyticsHelper.getInstance().logEvent("login", "click");
        setLoading(true);
        const user = await signInByGoogle();
        if (user) {
          window.location.reload();
        } else {
          setLoading(false);
        }
      }}
    >
      Sign in with Google
    </button>
  );
};

export default LoginButton;
