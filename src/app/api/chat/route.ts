import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: messages,
    stream: true,
    model: "gpt-3.5-turbo",
  };

  const response = await openai.chat.completions.create(params);
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
