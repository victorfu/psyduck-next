import "server-only";
import { getUserFromHeader } from "@/utils/session-utils";
import { adminAuth, listUsers } from "@/lib/firebase-admin-helper";
import AdminInput from "@/components/AdminInput";
import { revalidatePath } from "next/cache";
import { convertProviderIdToName } from "@/utils";

const PermissionDenied = () => <div>Permission denied</div>;

async function AdminPage() {
  const toggle = async (uid: string, isAdmin: boolean) => {
    "use server";
    try {
      await adminAuth.setCustomUserClaims(uid, { isAdmin: !isAdmin });
      revalidatePath("/administration");
    } catch (error) {
      console.error("Failed to toggle admin status:", error);
    }
  };

  const user = getUserFromHeader();
  if (!user) {
    return <PermissionDenied />;
  }
  const { customClaims } = user;
  if (customClaims?.isAdmin !== true) {
    return <PermissionDenied />;
  }

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

export default AdminPage;
