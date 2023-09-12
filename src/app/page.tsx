import "server-only";
import { getAuthInfo } from "@/utils/sessionUtils";

export default async function Home() {
  const authInfo = getAuthInfo();

  return (
    <>
      <div>
        Hello! {authInfo?.displayName} {authInfo?.email}
      </div>
    </>
  );
}
