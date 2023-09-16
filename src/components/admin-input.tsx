"use client";

import { Checkbox } from "@/components/ui/checkbox";

const AdminInput = ({
  uid,
  isAdmin,
  toggle,
}: {
  uid: string;
  isAdmin: boolean;
  toggle: (uid: string, isAdmin: boolean) => Promise<void>;
}) => {
  return (
    <Checkbox checked={isAdmin} onCheckedChange={() => toggle(uid, isAdmin)} />
  );
};

export default AdminInput;
