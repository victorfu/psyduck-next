"use client";

import { useState } from "react";
import FirebaseAnalytics from "@/lib/firebase-analytics";
import { signInByGoogle } from "@/lib/firebase-web-helper";
import { Button } from "./button";
import { Loader2 } from "lucide-react";

const LoginButton = () => {
  const [loading, setLoading] = useState(false);

  const login = async () => {
    FirebaseAnalytics.getInstance().logLogin();
    setLoading(true);
    const { user } = await signInByGoogle();
    if (user) {
      window.location.reload();
    } else {
      setLoading(false);
    }
  };

  return (
    <Button
      className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
      onClick={login}
      disabled={loading}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign in with Google
    </Button>
  );
};

export default LoginButton;
