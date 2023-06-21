import { runChatCompletion } from "@/services/openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = await runChatCompletion(req.body);
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }

    res.end("");
  }
}
