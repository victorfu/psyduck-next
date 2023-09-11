import "server-only";
import getUserAuthInfo from "@/utils/getUserAuthInfo";

export default async function Home() {
  const userInfo = getUserAuthInfo();

  return (
    <>
      <div>
        Hello! {userInfo?.displayName} {userInfo?.email}
      </div>
    </>
  );
}
