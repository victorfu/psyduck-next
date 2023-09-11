import "server-only";
import Image from "next/image";
import getUserAuthInfo from "@/utils/getUserAuthInfo";

function AccountPage() {
  const userInfo = getUserAuthInfo();

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
        src={userInfo?.photoURL || ""}
        alt="profile"
      />
      <div>uid: {userInfo?.uid}</div>
      <div>displayName: {userInfo?.displayName}</div>
      <div>email: {userInfo?.email}</div>
    </div>
  );
}

export default AccountPage;
