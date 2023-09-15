import "server-only";
import { getUserFromHeader } from "@/utils/session-utils";
import HospGrid from "@/components/HospGrid";

export default function Home() {
  const user = getUserFromHeader();
  return <HospGrid user={user} />;
}
