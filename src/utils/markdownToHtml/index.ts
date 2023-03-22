import html from "remark-html";
import remarkPrism from "remark-prism";
import remarkParse from "remark-parse";
import { remark } from "remark";

export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkParse)
    .use(html, { sanitize: false })
    .use(remarkPrism)
    .process(markdown);
  return result.toString();
};
