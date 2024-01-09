import "server-only";
import LineBotDialog from "@/components/line-bot-dialog";
import LineBotTable from "@/components/line-bot-table";
import { getBots } from "@/lib/actions";

export default async function Bot() {
  const { bots } = await getBots();

  return (
    <div className="space-y-4">
      <LineBotDialog />
      <LineBotTable bots={bots ?? []} />
    </div>
  );
}
