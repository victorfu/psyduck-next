"use client";

import LoadingSpinner from "@/components/ui/loading-spinner";
import AnalyticsHelper from "@/lib/analytics-helper";
import { PATHNAME_LOGIN } from "@/lib/constants";
import { signOut } from "@/lib/firebase-web-helper";
import { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      AnalyticsHelper.getInstance().logEvent("logout", "click");
      window.location.href = PATHNAME_LOGIN;
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
