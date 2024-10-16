import { Blog } from "@/types/cms";
import { createClient } from "microcms-js-sdk";

const serviceDomain = process.env.CMS_DOMAIN;
const apiKey = process.env.CMS_API_KEY;

if (serviceDomain === undefined || serviceDomain === "") {
  throw new Error("CMS_DOMAIN is not defined");
}

if (apiKey === undefined || apiKey === "") {
  throw new Error("CMS_API_KEY is not defined");
}

export const client = createClient({
  serviceDomain,
  apiKey,
});

export const getBlogs = async () => {
  return client.getList<Blog>({
    endpoint: "blogs",
    queries: { richEditorFormat: "object" },
  });
};

export const getBlog = async (slug: string) => {
  try {
    const blog = await client.getListDetail<Blog>({
      endpoint: "blogs",
      contentId: slug,
      // queries: { richEditorFormat: "object" },
    });
    return blog;
  } catch (e) {
    return null;
  }
};
