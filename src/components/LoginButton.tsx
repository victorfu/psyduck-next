"use client";

import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const { user, loadingAuthState, signInByGoogle } = useContext(GlobalContext);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [router, user]);

  return loadingAuthState && !user ? (
    <div>loading...</div>
  ) : (
    <button onClick={() => signInByGoogle()}>Sign in with Google</button>
  );
};

export default LoginButton;
