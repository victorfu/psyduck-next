import "server-only";
import { headers } from "next/headers";

const getUserAuthInfo = (): UserAuthInfo | null => {
  const headersList = headers();
  const userInfoString = headersList.get("user-auth-info");
  const userInfo: UserAuthInfo | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

  return userInfo;
};

export default getUserAuthInfo;
