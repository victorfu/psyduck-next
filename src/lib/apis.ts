export async function getLogin(apiUrl: string, session: string) {
  if (!session) {
    return { error: "Empty session", user: null };
  }
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      headers: {
        Cookie: `session=${session}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "Invalid session", user: null };
  }
}

export async function postLogin(idToken: string) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  };
  try {
    const res = await fetch(`/api/login`, options);
    return await res.json();
  } catch (error) {
    return { error: "Invalid IdToken" };
  }
}
