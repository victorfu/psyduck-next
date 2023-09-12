import "server-only";
import Image from "next/image";
import { getAuthInfoFromHeader } from "@/utils/sessionUtils";

function AccountPage() {
  const authInfo = getAuthInfoFromHeader();

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
        src={authInfo?.photoURL || ""}
        alt="profile"
      />
      <div>uid: {authInfo?.uid}</div>
      <div>displayName: {authInfo?.displayName}</div>
      <div>email: {authInfo?.email}</div>
    </div>
  );
}

export default AccountPage;
