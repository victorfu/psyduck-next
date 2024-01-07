"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import { PATHNAME_HOME } from "@/lib/constants";
import { signOut } from "@/lib/firebase-web-helper";
import { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      window.location.href = PATHNAME_HOME;
    };

    doSignOut();
  }, []);

  return (
    <div className="flex flex-col items-center pt-36">
      <LoadingSpinner fullpage={false} />
    </div>
  );
}

export default LogoutPage;
