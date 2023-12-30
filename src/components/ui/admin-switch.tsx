"use client";

import { useTransition } from "react";
import LoadingSpinner from "./loading-spinner";
import { Switch } from "@/components/ui/switch";
import { toggleIsAdmin } from "@/lib/actions";

const AdminSwitch = ({ uid, isAdmin }: { uid: string; isAdmin: boolean }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <LoadingSpinner fullpage={true} />}
      <Switch
        checked={isAdmin}
        onCheckedChange={() => {
          startTransition(async () => {
            await toggleIsAdmin(uid, isAdmin, "/administration/users");
          });
        }}
      />
    </>
  );
};

export default AdminSwitch;
