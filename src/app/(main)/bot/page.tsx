import "server-only";
import { getUserFromHeader } from "@/lib/session-utils";
import LineBotList from "@/components/line-bot-list";

export default function Bot() {
  const user = getUserFromHeader();

  return (
    <div>
      <LineBotList />
    </div>
  );
}
