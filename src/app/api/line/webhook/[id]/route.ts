import {
  MiddlewareConfig,
  WebhookRequestBody,
  messagingApi,
  HTTPError,
  validateSignature,
} from "@line/bot-sdk";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const LINE_CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET ?? "";
const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? "";

const lineConfig: MiddlewareConfig = {
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: LINE_CHANNEL_SECRET,
};

const { MessagingApiClient } = messagingApi;
const client = new MessagingApiClient({
  channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  // get channel secret by id

  if (!lineConfig.channelSecret) {
    throw new Error("no LINE_CHANNEL_SECRET");
  }
  const headersList = headers();
  const signature = headersList.get("x-line-signature");
  if (!signature) {
    return NextResponse.json(
      {
        error: "Invalid signature",
      },
      {
        status: 401,
      },
    );
  }

  const rawBody = await req.text();
  if (!validateSignature(rawBody, lineConfig.channelSecret, signature)) {
    return NextResponse.json(
      {
        error: "Failed to validate body by signature",
      },
      {
        status: 401,
      },
    );
  }

  const body: WebhookRequestBody = JSON.parse(rawBody);
  await Promise.all(
    body.events.map((event) =>
      (async () => {
        if (event.mode === "active") {
          switch (event.type) {
            case "message": {
              const name = event.source.userId
                ? (await client.getProfile(event.source.userId)).displayName
                : "User";
              console.log(name);
              client
                .replyMessage({
                  replyToken: event.replyToken,
                  messages: [
                    {
                      type: "text",
                      text: "I cannot leave a 1-on-1 chat!",
                    },
                  ],
                })
                .catch((err) => {
                  if (err instanceof HTTPError) {
                    console.error(err.statusCode);
                  }
                });
              break;
            }
            case "follow": {
              // Do something.
              break;
            }
          }
        }
      })(),
    ),
  );

  return NextResponse.json({ message: "ok" }, { status: 200 });
}
