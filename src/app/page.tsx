import { cookies, headers } from "next/headers";

const convert = (providerId: string) => {
  if (providerId === "google.com") {
    return "Google";
  }
  if (providerId === "oidc.line") {
    return "LINE";
  }
  return providerId;
};

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
          <div>From {convert(user.providerData[0].providerId)} login</div>
        </>
      )}
    </main>
  );
}
