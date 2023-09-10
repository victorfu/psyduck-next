"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/components/GlobalContext";

function LoginPage() {
  const router = useRouter();
  const { user, loadingAuthState, signInByGoogle } = useContext(GlobalContext);

  if (loadingAuthState) {
    return <div>loading...</div>;
  }

  if (loadingAuthState === false && user) {
    return <div />;
  }

  return (
    <div>
      <div>Welcome to Psyduck Next</div>
      <br />
      <button onClick={() => signInByGoogle(() => router.push("/"))}>
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginPage;
