"use client";

import { useState } from "react";
import AnalyticsHelper from "@/lib/analytics-helper";
import LoadingSpinner from "./LoadingSpinner";
import { signInByGoogle } from "@/lib/firebase-web-helper";

const LoginButton = () => {
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
