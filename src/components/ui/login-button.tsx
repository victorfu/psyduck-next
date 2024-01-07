"use client";

import { useState } from "react";
import FirebaseAnalytics from "@/lib/firebase-analytics";
import LoadingSpinner from "./loading-spinner";
import { signInByGoogle } from "@/lib/firebase-web-helper";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <LoadingSpinner fullpage={false} />
  ) : (
    <button
      className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      onClick={async () => {
        FirebaseAnalytics.getInstance().logLogin();
        setLoading(true);
        const { user } = await signInByGoogle();
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
