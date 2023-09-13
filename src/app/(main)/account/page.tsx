import "server-only";
import Image from "next/image";
import { getUserFromHeader } from "@/utils/session-utils";

function AccountPage() {
  const user = getUserFromHeader();

  return (
    <div>
      <Image
        style={{
          height: "auto",
          width: "auto",
          maxWidth: 150,
          minWidth: 70,
        }}
        height={0}
        width={0}
        sizes={"100vw"}
        src={user?.photoURL || ""}
        alt="profile"
      />
      <div>uid: {user?.uid}</div>
      <div>displayName: {user?.displayName}</div>
      <div>email: {user?.email}</div>
    </div>
  );
}

export default AccountPage;
