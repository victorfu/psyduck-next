"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import { deleteBot } from "@/lib/actions";
import { PATHNAME_BOT } from "@/lib/constants";
import DataTable from "./ui/data-table";

export default function LineBotTable({ bots }: { bots: Bot[] }) {
  const { toast } = useToast();

  const columns: ColumnDef<Bot>[] = [
    {
      accessorKey: "id",
      header: "Id",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "channelId",
      header: "Channel Id",
    },
    {
      accessorKey: "channelSecret",
      header: "Channel Secret",
    },
    {
      accessorKey: "channelAccessToken",
      header: "Channel Access Token",
      cell: ({ row }) => {
        const bot = row.original;
        const channelAccessToken = bot.channelAccessToken;
        return <div>{`${channelAccessToken.substring(0, 10)}...`}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const bot = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
                  const webhookUrl = `${appUrl}/api/line/webhook/${bot.channelId}`;
                  navigator.clipboard.writeText(webhookUrl);
                  toast({
                    title: "URL copied to clipboard",
                    description: webhookUrl,
                  });
                }}
              >
                Copy Webhook URL
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={async () => {
                  await deleteBot(bot.id, PATHNAME_BOT);

                  toast({
                    variant: "default",
                    title: `${bot.name} deleted.`,
                  });
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={bots} />;
}
