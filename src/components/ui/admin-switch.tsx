"use client";

import { useTransition } from "react";
import LoadingSpinner from "./loading-spinner";
import { Switch } from "@/components/ui/switch";

const AdminSwitch = ({
  uid,
  isAdmin,
  toggle,
}: {
  uid: string;
  isAdmin: boolean;
  toggle: (uid: string, isAdmin: boolean) => Promise<void>;
}) => {
  let [isPending, startTransition] = useTransition();

  return (
    <>
      {isPending && <LoadingSpinner fullpage={true} />}
      <Switch
        checked={isAdmin}
        onCheckedChange={() => {
          startTransition(async () => {
            await toggle(uid, isAdmin);
          });
        }}
      />
    </>
  );
};

export default AdminSwitch;
