import "server-only";
import { getUserFromHeader } from "@/lib/session-utils";
import HospGrid from "@/components/hosp-grid";

export default function Home() {
  const user = getUserFromHeader();
  return <HospGrid user={user} />;
}
