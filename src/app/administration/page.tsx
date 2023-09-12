import "server-only";
import { verifySessionAndGetUser } from "@/utils/sessionUtils";
import { NextResponse } from "next/server";
import { listUsers } from "@/lib/firebase-admin-helper";
import { convertProviderIdToName } from "@/utils/convertProviderIdToName";

const PermissionDenied = () => <div>Permission denied</div>;

async function AdminPage() {
  const verificationResult = await verifySessionAndGetUser();
  if (verificationResult instanceof NextResponse) {
    return <PermissionDenied />;
  }

  const { user } = verificationResult;
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
