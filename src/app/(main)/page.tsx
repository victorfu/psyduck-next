import "server-only";
import { getUserFromHeader } from "@/lib/session-utils";
import Consult from "@/components/consult";

export default function Home() {
  const user = getUserFromHeader();
  return <Consult user={user} />;
}
