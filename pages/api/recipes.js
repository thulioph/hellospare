import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const runCompletion = async (prompt) => {
  const fullMessage = `What can I cook with these ingredients ${prompt}?`;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: fullMessage,
  });

  return completion;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { data } = await runCompletion(req.body);
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }

    res.end("");
  }
}
