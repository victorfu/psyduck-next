import Nav from "./nav";

export default function Content({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: User;
}) {
  return (
    <div className="min-hfull">
      <Nav user={user} />
      <div className="p-4">
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
