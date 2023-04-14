import { PostCard } from "@/components/posts/PostCard";
import { BaseHead } from "@/components/shared/BaseHead";
import { TransitionLink } from "@/components/shared/TransitionLink";
import { Typography } from "@/components/shared/Typography";
import { getBlogs } from "@/lib/cmsClient";
import { Blog } from "@/types/cms";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import style from "./index.module.css";

type Entries = MicroCMSListResponse<Blog>;

export const getStaticProps: GetStaticProps<{
  entries: Entries;
}> = async () => {
  const entries = await getBlogs();
  return {
    props: {
      entries,
    },
  };
};

const Posts = ({ entries }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <BaseHead title="posts | zi / @iz_dot" description="zi's posts" />
      <section className={style.section}>
        <header className={style.header}>
          <div className={style["post-image-outer"]}>
            <Image
              src="/post.png"
              alt=""
              width="96"
              height="153"
              className={style["post-image"]}
            />
          </div>
          <h1 className={style["header-title"]}>Posts</h1>
          <Typography variant="h2" className={style["header-subtitle"]}>
            日々の考えや作ったもの置き場
          </Typography>
        </header>
        <ul className={style.posts} role="list">
          {entries.contents.map((content, i) => {
            return (
              <li
                className={style.post}
                key={i}
                role="listitem"
                style={{
                  viewTransitionName: `post-${content.id}`,
                }}
              >
                <TransitionLink href={`/posts/${content.id}`}>
                  <PostCard
                    id={content.id}
                    title={content.title}
                    imageUrl={content.eyecatch.url}
                    width={content.eyecatch.width}
                    height={content.eyecatch.height}
                    publishedAt={new Date(content.publishedAt ?? "")}
                  />
                </TransitionLink>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Posts;
