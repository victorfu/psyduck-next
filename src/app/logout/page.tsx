"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import AnalyticsHelper from "@/lib/analytics-helper";
import { signOut } from "@/lib/firebase-web-helper";
import { useEffect } from "react";

function LogoutPage() {
  useEffect(() => {
    const doSignOut = async () => {
      await signOut();
      AnalyticsHelper.getInstance().logEvent("logout", "click");
      window.location.href = "/login";
    };

    doSignOut();
  }, []);

  return <LoadingSpinner />;
}

export default LogoutPage;
