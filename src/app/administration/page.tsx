import "server-only";
import { getUserFromHeader } from "@/utils/sessionUtils";
import { adminAuth, listUsers } from "@/lib/firebase-admin-helper";
import { convertProviderIdToName } from "@/utils/convertProviderIdToName";
import AdminInput from "@/components/AdminInput";
import { revalidatePath } from "next/cache";

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
    <div className="user-list">
      {users.map((user) => {
        const isAdmin = user.customClaims?.isAdmin === true;
        const providerId = user.providerData[0]?.providerId;
        return (
          <div className={`user-item ${isAdmin ? "admin" : ""}`} key={user.uid}>
            <div className="user-item-field">
              <strong>Display Name: </strong>
              {user.displayName}
              <AdminInput uid={user.uid} isAdmin={isAdmin} toggle={toggle} />
              {isAdmin && <span className="admin-label">admin</span>}
            </div>
            <div className="user-item-field">
              <strong>Provider: </strong>
              {convertProviderIdToName(providerId) ?? "N/A"}
            </div>
            <div className="user-item-field">
              <strong>Email: </strong>
              {user.email ?? "N/A"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdminPage;
