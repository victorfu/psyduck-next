import { cookies, headers } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const session = cookieStore.get("session");
  const headersList = headers();
  const xUrl = headersList.get("x-url") || "";
  const { user } = await fetch(`${xUrl}/api/account`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
    next: {
      revalidate: 5,
    },
  }).then((res) => res.json());

  return (
    <main className="flex flex-col items-center justify-center">
      {user && (
        <>
          <p>
            Hello! {user.displayName} {user.email}
          </p>
        </>
      )}
    </main>
  );
}
