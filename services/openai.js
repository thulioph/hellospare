import { Configuration, OpenAIApi } from "openai";

// Open AI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const runCompletion = async (prompt) => {
  const fullMessage = `What can I cook with these ingredients ${prompt}? `;

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: fullMessage,
    temperature: 0.5, // https://platform.openai.com/docs/api-reference/completions/create#completions/create-temperature
    max_tokens: 100, // https://platform.openai.com/docs/api-reference/completions/create#completions/create-max_tokens
  });

  return completion;
};

export const runChatCompletion = async (prompt) => {
  const outputFormat = "JSON";
  const fullMessage = `Give me a recipe to cook in ${outputFormat} format, using these ingredients ${prompt} `;

  const chatCompletion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: fullMessage }],
    temperature: 0.9,
    n: 1, // https://platform.openai.com/docs/api-reference/completions/create#completions/create-n
  });

  return chatCompletion;
};
