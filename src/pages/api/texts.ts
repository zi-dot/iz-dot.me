import { loadDefaultJapaneseParser } from "budoux";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const parser = loadDefaultJapaneseParser();
  const text = req.query.text ?? "";
  if (Array.isArray(text)) {
    return res.status(400).json({ error: "text must be a string" });
  }
  const result = parser.parse(text);
  res.json({ text: result });
}
