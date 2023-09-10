import "server-only";
import getUserQuickInfo from "@/utils/getUserQuickInfo";

export default async function Home() {
  const userInfo = getUserQuickInfo();

  return (
    <>
      <div>
        Hello! {userInfo?.displayName} {userInfo?.email}
      </div>
    </>
  );
}
