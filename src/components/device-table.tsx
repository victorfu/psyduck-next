"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useToast } from "@/components/ui/use-toast";
import DataTable from "./ui/data-table";
import { deleteDevice } from "@/lib/actions";
import { PATHNAME_DEVICE } from "@/lib/constants";
import Link from "next/link";

export default function DeviceTable({ devices }: { devices: Device[] }) {
  const { toast } = useToast();

  const columns: ColumnDef<Device>[] = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => {
        const device = row.original;
        return (
          <div>
            <Link href={`/device/${device.id}`}>{device.id}</Link>
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const device = row.original;
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
              <DropdownMenuItem>
                <Link className="w-full" href={`/device/${device.id}`}>
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={async () => {
                  await deleteDevice(device.id, PATHNAME_DEVICE);

                  toast({
                    variant: "default",
                    title: `${device.name} deleted.`,
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

  return <DataTable columns={columns} data={devices} />;
}
