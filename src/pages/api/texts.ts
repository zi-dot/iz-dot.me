import { loadDefaultJapaneseParser } from "budoux";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  const parser = loadDefaultJapaneseParser();
  const text = JSON.parse(req.body).text as string;
  if (typeof text !== "string") {
    return res.status(400).json({ error: "text must be a string" });
  }
  const result = parser.parse(text);
  res.json({ text: result });
}
