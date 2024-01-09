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
import DataTable from "./ui/data-table";
import { UserRecord } from "firebase-admin/auth";
import AdminSwitch from "./ui/admin-switch";
import { providerIdToName } from "@/lib/utils";
import { useToast } from "./ui/use-toast";

export default function UserTable({ users }: { users: UserRecord[] }) {
  const { toast } = useToast();

  const columns: ColumnDef<UserRecord>[] = [
    {
      accessorKey: "uid",
      header: "Uid",
    },
    {
      accessorKey: "displayName",
      header: "Name",
    },
    {
      accessorKey: "user",
      header: "Admin",
      cell: ({ row }) => {
        const user = row.original;
        const isAdmin = user.customClaims?.isAdmin === true;
        return <AdminSwitch uid={user.uid} isAdmin={isAdmin} />;
      },
    },
    {
      accessorKey: "provider",
      header: "Provider",
      cell: ({ row }) => {
        const user = row.original;
        const providerId = user.providerData[0]?.providerId;
        return <div>{providerIdToName(providerId)}</div>;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
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
                  navigator.clipboard.writeText(user?.email ?? "");
                  toast({
                    title: "Email copied to clipboard",
                    description: user.email,
                  });
                }}
              >
                Copy Email
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users.sort((a, b) => {
        const isAdminA = a.customClaims?.isAdmin === true ? 1 : 0;
        const isAdminB = b.customClaims?.isAdmin === true ? 1 : 0;
        return isAdminB - isAdminA;
      })}
    />
  );
}
