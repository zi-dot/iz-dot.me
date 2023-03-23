import { BaseHead } from "@/components/shared/BaseHead";
import { getBlog, getBlogs } from "@/lib/cmsClient";
import { Blog } from "@/types/cms";
import { loadDefaultJapaneseParser } from "budoux";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { ParsedUrlQuery } from "querystring";

import styles from "./index.module.css";

import { markdownToHtml } from "@/utils/markdownToHtml";
import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { PostContent } from "@/components/posts/PostContent";

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
  post: Blog & MicroCMSDate & MicroCMSContentId;
}> = async ({ params }) => {
  const post = await getBlog(params?.slug as string);
  if (post === null) throw new Error("Post not found");

  const parser = loadDefaultJapaneseParser();
  const contentHtml = await markdownToHtml(post.content);
  const contentHtmlWithWbr = contentHtml.replace(/(?<=>).*?(?=<)/g, (match) => {
    return parser.parse(match).join("<wbr />");
  });

  post.content = contentHtmlWithWbr;

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
        description={post.description ?? "ziのブログ"}
        ogImage={post.eyecatch.url}
      />
      <Link href="/posts" className={styles["back-to-post"]}>
        {"<- Back to Posts"}
      </Link>
      <div className={styles["title-wrapper"]}>
        <Image
          src={post.eyecatch.url}
          alt=""
          width={post.eyecatch.width}
          height={post.eyecatch.height}
          className={styles["title-image"]}
        />
        <h2 className={styles.title}>{post.title}</h2>
        {post.publishedAt && (
          <p className={styles["title-published-at"]}>
            Published on {formatDate(new Date(post.publishedAt))}
          </p>
        )}
      </div>
      <hr className={styles.divider} />
      <PostContent html={post.content} />
    </>
  );
};

export default Blog;
