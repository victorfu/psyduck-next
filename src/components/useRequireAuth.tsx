import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { GlobalContext } from "./GlobalContext";

const useRequireAuth = () => {
  const router = useRouter();
  const { user, loadingAuthState } = useContext(GlobalContext);

  useEffect(() => {
    if (!loadingAuthState && !user) {
      router.replace("/login");
    }
  }, [loadingAuthState, router, user]);
};

export default useRequireAuth;
