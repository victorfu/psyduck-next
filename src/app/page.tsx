import "server-only";
import { getUserFromHeader } from "@/utils/session-utils";

export default async function Home() {
  const user = getUserFromHeader();

  return (
    <>
      <div>
        Hello! {user?.displayName} {user?.email}
      </div>
    </>
  );
}
