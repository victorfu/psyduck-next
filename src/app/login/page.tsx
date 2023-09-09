"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/components/GlobalContext";

function LoginPage() {
  const router = useRouter();
  const { signInByGoogle, signInByLine } = useContext(GlobalContext);

  return (
    <div>
      <p>Welcome to Psyduck</p>
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
        <div
          style={{
            height: 5,
          }}
        />
        <button onClick={() => signInByLine(() => router.push("/"))}>
          Sign in with LINE
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
