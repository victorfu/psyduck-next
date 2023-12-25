export async function validateSession(
  apiUrl: string,
  session: string,
): Promise<AuthResponse> {
  if (!session) {
    return { error: "Empty session", user: undefined };
  }
  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      headers: {
        Cookie: `session=${session}`,
      },
    });
    return await response.json();
  } catch (error) {
    return { error: "Invalid session", user: undefined };
  }
}

export async function authenticate(idToken: string): Promise<AuthResponse> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
  };
  try {
    const response = await fetch(`/api/login`, options);
    return await response.json();
  } catch (error) {
    return { error: "Invalid IdToken", user: undefined };
  }
}
