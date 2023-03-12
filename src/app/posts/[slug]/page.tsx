import { getBlog, getBlogs } from "@/lib/cmsClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const entries = await getBlogs();

  console.log(entries.contents.map((content) => ({ slug: content.id })));

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

const Blog = async ({ params: { slug } }: Props) => {
  const blog = await getBlog(slug);
  if (blog === null) {
    notFound();
  }

  return <div>{slug}</div>;
};

export default Blog;
