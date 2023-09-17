"use client";

import { useTransition } from "react";
import LoadingSpinner from "./loading-spinner";
import { Switch } from "@/components/ui/switch";
import { toggleAdminPermission } from "@/lib/actions";

const AdminSwitch = ({ uid, isAdmin }: { uid: string; isAdmin: boolean }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <LoadingSpinner fullpage={true} />}
      <Switch
        checked={isAdmin}
        onCheckedChange={() => {
          startTransition(async () => {
            await toggleAdminPermission(uid, isAdmin);
          });
        }}
      />
    </>
  );
};

export default AdminSwitch;
