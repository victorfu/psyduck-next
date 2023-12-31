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

export async function fetchBotList(
  providerId: string,
  ses: string,
): Promise<Bot[]> {
  const response = await fetch("/api/line/bots", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ providerId, ses }),
  });
  const data = await response.json();
  return data;
}

export async function fetchBotDetail(
  channelId: string,
  ses: string,
): Promise<BotDetail> {
  const response = await fetch(`/api/line/bots/${channelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ channelId, ses }),
  });
  const data = await response.json();
  return data;
}
