import { BaseHead } from "@/components/shared/BaseHead";
import { getBlog, getBlogs } from "@/lib/cmsClient";
import { Blog } from "@/types/cms";
import { loadDefaultJapaneseParser } from "budoux";
import { MicroCMSContentId } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

import styles from "./index.module.css";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const entries = await getBlogs();

  const paths = entries.contents.map((entry) => ({
    params: { slug: entry.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  post: (Blog & MicroCMSContentId) | null;
}> = async ({ params }) => {
  const post = await getBlog(params?.slug as string);
  if (post === null) return { props: { post } };

  const parser = loadDefaultJapaneseParser();
  const content = post.content.replace(/(?<=>).*?(?=<)/g, (match) => {
    return parser.parse(match).join("<wbr />");
  });

  post.content = content;

  return {
    props: {
      post,
    },
  };
};

const Blog = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (post === null) return null;
  return (
    <>
      <BaseHead
        title={post.title}
        description={post.description ?? ""}
        ogImage={post.eyecatch.url}
      />
      <article
        className={styles.cms}
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></article>
    </>
  );
};

export default Blog;
