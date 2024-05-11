import { TransitionLink } from "@/components/shared/TransitionLink";
import Image from "next/image";
import { getBlog, getBlogs } from "@/lib/cmsClient";
import { markdownToHtml } from "@/utils/markdownToHtml";
import { CSSProperties } from "react";

import styles from "./index.module.css";
import { formatDate } from "@/utils/formatDate";
import { PostContent } from "@/components/posts/PostContent";

export async function generateStaticParams() {
  const entries = await getBlogs();

  return entries.contents.map((entry) => ({
    slug: entry.id,
  }));
}

async function getPost(slug: string) {
  const post = await getBlog(slug);
  if (post === null) throw new Error("Post not found");

  const contentHtml = await markdownToHtml(post.content);

  return {
    post: {
      ...post,
      content: contentHtml,
    },
  };
}

const Post = async ({ params }: { params: { slug: string } }) => {
  const { post } = await getPost(params.slug);

  return (
    <>
      <TransitionLink href="/posts" className={styles["back-to-post"]}>
        {"<- Back to Posts"}
      </TransitionLink>
      <div
        style={
          {
            viewTransitionName: `post-${post.id}`,
          } as CSSProperties
        }
      >
        <div className={styles["title-wrapper"]}>
          <Image
            src={post.eyecatch.url}
            alt=""
            width={post.eyecatch.width}
            height={post.eyecatch.height}
            className={styles["title-image"]}
            style={
              {
                viewTransitionName: `post-image-${post.id}`,
              } as CSSProperties
            }
          />
          <h2
            className={styles.title}
            style={
              {
                viewTransitionName: `post-title-${post.id}`,
              } as CSSProperties
            }
          >
            {post.title}
          </h2>
          {post.publishedAt && (
            <p className={styles["title-published-at"]}>
              Published on {formatDate(new Date(post.publishedAt))}
            </p>
          )}
        </div>
        <hr className={styles.divider} />
        <PostContent html={post.content} />
      </div>
    </>
  );
};

export default Post;
