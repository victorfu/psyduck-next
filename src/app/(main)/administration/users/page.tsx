import "server-only";
import { listUsers } from "@/lib/firebase-admin-helper";
import UserTable from "@/components/user-table";

async function UsersPage() {
  const users = await listUsers();
  return <UserTable users={JSON.parse(JSON.stringify(users))} />;
}

export default UsersPage;
