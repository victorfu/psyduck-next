import "server-only";
import { headers } from "next/headers";

const getUserQuickInfo = (): UserQuickInfo | null => {
  const headersList = headers();
  const userInfoString = headersList.get("user-quick-info");
  const userInfo: UserQuickInfo | null = userInfoString
    ? JSON.parse(userInfoString)
    : null;

  return userInfo;
};

export default getUserQuickInfo;
