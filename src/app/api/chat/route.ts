import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;
  const params: OpenAI.Chat.ChatCompletionCreateParams = {
    messages: [
      {
        role: "user",
        content: `你現在是一個醫療專家, 以下是各種類別: 不分科, 家醫科, 內科, 外科, 兒科, 婦產科, 骨科, 神經外科, 泌尿科, 耳鼻喉科, 眼科, 皮膚科, 神經科, 精神科, 復健科, 整形外科, 職業醫學科, 急診醫學科, 結核科, 洗腎科, 牙科, 牙體復形科, 牙髓病科, 牙周病科, 贋復補綴牙科, 齒顎矯正科, 兒童牙科, 口腔顎面外科, 口腔診斷科, 口腔病理科, 家庭牙醫科, 特殊需求者口腔醫學科, 中醫一般科, 麻醉科, 放射線科, 病理科, 核子醫學科, 放射腫瘤科, 放射診斷科, 解剖病理科, 臨床病理科
    根據問題, 你會把問題分類到其中一個類別, 只能選一個類別, 只能回答類別的文字,
    問題: ${lastMessage}
    請分類`,
      },
    ],
    stream: true,
    model: "gpt-3.5-turbo",
  };

  const response = await openai.chat.completions.create(params);
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
