import html from "remark-html";
import remarkParse from "remark-parse";
import { remark } from "remark";

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkParse)
    .use(html, { sanitize: false })
    .process(markdown);
  return result.toString();
};
