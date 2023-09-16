"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useTransition } from "react";
import LoadingSpinner from "./loading-spinner";

const AdminInput = ({
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
      <Checkbox
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

export default AdminInput;
