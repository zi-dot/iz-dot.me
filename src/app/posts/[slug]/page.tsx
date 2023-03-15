import { getBlog, getBlogs } from "@/lib/cmsClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = await getBlogs();

  return entries.contents.map((entry) => ({
    slug: entry.id,
  }));
}

type Params = {
  slug: string;
};

type Props = {
  params: Params;
};

const getPost = async (slug: string) => {
  const post = await getBlog(slug);
  if (post === null) return null;

  const r = await Promise.all(
    post.content.split(">").map(async (content) => {
      const r = await Promise.all(
        content.split("<").map(async (content, i) => {
          if (i > 0) return content;
          const data = await fetch(
            `${process.env.URL}/api/texts?text=${content}`,
            {
              // method: "POST",
              cache: "force-cache",
              // body: JSON.stringify({
              //   text: content,
              // }),
            }
          );
          const text = (await data.json()) as { text: string[] };
          return text.text.join("<wbr />");
        })
      );
      return r.join("<");
    })
  );
  const content = r.join(">");

  return { ...post, content };
};

const Blog = async ({ params: { slug } }: Props) => {
  const post = await getPost(slug);
  if (!post) return notFound();
  return <div dangerouslySetInnerHTML={{ __html: post.content }}></div>;
};

export default Blog;
