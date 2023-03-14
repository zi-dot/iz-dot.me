import { getBlogs } from "@/lib/cmsClient";
// import { loadDefaultJapaneseParser } from "budoux";
import style from "./page.module.css";

export const metadata = {
  title: "Posts",
  description: "Posts page",
};

const getPosts = async () => {
  const entries = await getBlogs();
  return entries;
};

const Posts = async () => {
  const entriesInfo = await getPosts();
  // const parser = loadDefaultJapaneseParser();
  // console.log(parser.parse("こんにちは"));

  return (
    <div className={style.box}>
      <h1 style={{ marginBottom: "16px" }}>Posts</h1>
      <p> 🚧 Under construction </p>
      <ul>
        {entriesInfo.contents.map((content, i) => {
          return (
            <li key={i}>
              <a href={`/posts/${content.id}`}>{content.title}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
