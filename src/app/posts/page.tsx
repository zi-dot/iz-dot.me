import { getBlogs } from "@/lib/cmsClient";
import Image from "next/image";
import style from "./posts.module.css";
import { Typography } from "@/components/shared/Typography";
import { CSSProperties } from "react";
import { TransitionLink } from "@/components/shared/TransitionLink";
import { PostCard } from "@/components/posts/PostCard";

const getEntries = async () => {
  const entries = await getBlogs();
  return {
    entries,
  };
};

const Posts = async () => {
  const { entries } = await getEntries();

  return (
    <>
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
                style={
                  {
                    viewTransitionName: `post-${content.id}`,
                  } as CSSProperties
                }
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
