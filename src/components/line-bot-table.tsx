"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

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

        const handleCopy = () => {
          navigator.clipboard.writeText(channelAccessToken);
          toast({
            title: "Copied to clipboard",
          });
        };

        return (
          <div
            className="cursor-pointer"
            onClick={handleCopy}
            title="Click to copy"
          >
            {`${channelAccessToken.substring(0, 10)}...`}
          </div>
        );
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
                  console.log(bot);

                  toast({
                    variant: "destructive",
                    title: "Deleted",
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
