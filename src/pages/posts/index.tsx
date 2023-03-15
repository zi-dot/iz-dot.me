import { BaseHead } from "@/components/shared/BaseHead";
import { getBlogs } from "@/lib/cmsClient";
import { Blog } from "@/types/cms";
import { MicroCMSListResponse } from "microcms-js-sdk";
import { GetStaticProps, InferGetStaticPropsType } from "next";
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
      <div className={style.box}>
        <h1 style={{ marginBottom: "16px" }}>Posts</h1>
        <p> 🚧 Under construction </p>
        <ul>
          {entries.contents.map((content, i) => {
            return (
              <li key={i}>
                <a href={`/posts/${content.id}`}>{content.title}</a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Posts;