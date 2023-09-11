"use client";

import { useContext } from "react";
import { GlobalContext } from "./GlobalContext";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  const { signInByGoogle } = useContext(GlobalContext);

  return (
    <button onClick={() => signInByGoogle(() => router.replace("/"))}>
      Sign in with Google
    </button>
  );
};

export default LoginButton;
