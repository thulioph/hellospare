import getHFIngredients from "@/services/scrapper";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getHFIngredients();
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ error });
    }

    res.end("");
  }
}
