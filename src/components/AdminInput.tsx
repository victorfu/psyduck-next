"use client";

import { useRouter } from "next/navigation";

const AdminInput = ({ uid, isAdmin }: { uid: string; isAdmin: boolean }) => {
  const router = useRouter();
  const toggleAdminPermission = async (uid: string) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
      };
      await fetch(`/api/admin/users/${uid}`, options);
      router.refresh();
    } catch (error) {
      console.error("Failed to toggle admin status:", error);
    }
  };

  return (
    <input
      type="checkbox"
      checked={isAdmin}
      onChange={() => toggleAdminPermission(uid)}
    />
  );
};

export default AdminInput;
