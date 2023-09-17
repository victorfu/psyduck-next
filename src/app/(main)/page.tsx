import "server-only";
import { getUserFromHeader } from "@/lib/session-utils";
import Ask from "@/components/ask";

export default function Home() {
  const user = getUserFromHeader();
  return <Ask user={user} />;
}
