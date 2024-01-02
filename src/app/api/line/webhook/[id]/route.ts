import {
  WebhookRequestBody,
  messagingApi,
  HTTPError,
  validateSignature,
} from "@line/bot-sdk";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { adminFirestore } from "@/lib/firebase-admin-helper";

const { MessagingApiClient } = messagingApi;

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ error: "Invalid bot id" }, { status: 400 });
  }

  const headersList = headers();
  const signature = headersList.get("x-line-signature");
  if (!signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const querySnapshot = await adminFirestore
    .collection("bots")
    .where("channelId", "==", id)
    .get();

  if (querySnapshot.empty) {
    return NextResponse.json({ error: "Bot not found" }, { status: 404 });
  }

  const bot = querySnapshot.docs[0].data();
  const channelId = bot.channelId;
  const channelSecret = bot.channelSecret;
  const channelAccessToken = bot.channelAccessToken;

  if (!channelId || !channelSecret || !channelAccessToken) {
    return NextResponse.json({ error: "Invalid bot id" }, { status: 400 });
  }

  const rawBody = await req.text();
  if (!validateSignature(rawBody, channelSecret, signature)) {
    return NextResponse.json(
      { error: "Failed to validate body by signature" },
      { status: 401 },
    );
  }

  const client = new MessagingApiClient({
    channelAccessToken,
  });

  const body: WebhookRequestBody = JSON.parse(rawBody);
  await Promise.all(
    body.events.map((event) =>
      (async () => {
        if (event.mode === "active") {
          switch (event.type) {
            case "message": {
              // const name = event.source.userId
              //   ? (await client.getProfile(event.source.userId)).displayName
              //   : "User";
              if (event.message.type === "text") {
                client
                  .replyMessage({
                    replyToken: event.replyToken,
                    messages: [
                      {
                        type: "text",
                        text: event.message.text,
                      },
                    ],
                  })
                  .catch((err) => {
                    if (err instanceof HTTPError) {
                      console.error(err.statusCode);
                    }
                  });
              }
              break;
            }
            case "follow": {
              break;
            }
          }
        }
      })(),
    ),
  );

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
