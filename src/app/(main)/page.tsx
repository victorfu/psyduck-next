import "server-only";
import { getUserFromHeader } from "@/utils/session-utils";

export default function Home() {
  const user = getUserFromHeader();

  return (
    <>
      <div>Hello! {user?.displayName}</div>
    </>
  );
}
