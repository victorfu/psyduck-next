import "server-only";
import { listUsers } from "@/lib/firebase-admin-helper";
import AdminInput from "@/components/ui/admin-input";
import { convertProviderIdToName } from "@/lib/utils";
import { toggleAdminPermission } from "@/lib/actions";

async function UsersPage() {
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
              <AdminInput
                uid={user.uid}
                isAdmin={isAdmin}
                toggle={toggleAdminPermission}
              />
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
