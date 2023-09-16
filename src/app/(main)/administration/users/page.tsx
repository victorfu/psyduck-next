import "server-only";
import { adminAuth, listUsers } from "@/lib/firebase-admin-helper";
import AdminInput from "@/components/admin-input";
import { revalidatePath } from "next/cache";
import { convertProviderIdToName } from "@/lib/utils";

async function UsersPage() {
  const toggle = async (uid: string, isAdmin: boolean) => {
    "use server";
    try {
      if (uid === process.env.OWNER_UID) {
        throw new Error("Cannot change owner status");
      }

      await adminAuth.setCustomUserClaims(uid, { isAdmin: !isAdmin });
      revalidatePath("/administration/users");
    } catch (error) {
      console.error("Failed to toggle admin status:", error);
    }
  };

  const users = await listUsers();
  return (
    <div className="w-full flex flex-col">
      {users.map((user) => {
        const isAdmin = user.customClaims?.isAdmin === true;
        const providerId = user.providerData[0]?.providerId;
        return (
          <div
            className={`border border-gray-300 p-4 rounded ${
              isAdmin ? "bg-gray-200" : ""
            } my-2`}
            key={user.uid}
          >
            <div className="mb-1">
              <strong className="mr-2">Display Name: </strong>
              <span className="mr-2">{user.displayName}</span>
              <AdminInput uid={user.uid} isAdmin={isAdmin} toggle={toggle} />
              {isAdmin && <span className="text-red-500 ml-1">admin</span>}
            </div>
            <div className="mb-1">
              <strong className="mr-2">Provider: </strong>
              {convertProviderIdToName(providerId) ?? "N/A"}
            </div>
            <div className="mb-1">
              <strong className="mr-2">Email: </strong>
              {user.email ?? "N/A"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default UsersPage;
