import "server-only";
import { getAuthInfoFromHeader } from "@/utils/sessionUtils";

export default async function Home() {
  const authInfo = getAuthInfoFromHeader();

  return (
    <>
      <div>
        Hello! {authInfo?.displayName} {authInfo?.email}
      </div>
    </>
  );
}
