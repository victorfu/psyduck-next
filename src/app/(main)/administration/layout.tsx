import { getUserFromHeader } from "@/lib/session-utils";

const PermissionDenied = () => <div>Permission denied</div>;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUserFromHeader();
  if (!user || user.customClaims?.isAdmin !== true) {
    return <PermissionDenied />;
  }
  return <section>{children}</section>;
}
