"use client";

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
    <input
      type="checkbox"
      checked={isAdmin}
      onChange={() => toggle(uid, isAdmin)}
    />
  );
};

export default AdminInput;
