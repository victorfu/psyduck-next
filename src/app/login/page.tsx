"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/components/GlobalContext";

function LoginPage() {
  const router = useRouter();
  const { signInByGoogle } = useContext(GlobalContext);

  return (
    <div>
      <p>Welcome to Psyduck Next</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 150,
        }}
      >
        <button onClick={() => signInByGoogle(() => router.push("/"))}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
