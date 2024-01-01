import "server-only";
import { getUserFromHeader } from "@/lib/session-utils";
import LineBotDrawer from "@/components/line-bot-drawer";
import LineBotTable from "@/components/line-bot-table";
import { getBots } from "@/lib/actions";

export default async function Bot() {
  const { bots } = await getBots();

  return (
    <div className="space-y-4">
      <LineBotDrawer />
      <LineBotTable bots={bots ?? []} />
    </div>
  );
}
