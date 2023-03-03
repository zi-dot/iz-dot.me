import style from "./page.module.css";

export const metadata = {
  title: "About",
  description: "Web frontend engineer",
};

const About = () => {
  return (
    <main className={style.page}>
      <h1>Posts</h1>
      <p>Will posts many blogs and works</p>
    </main>
  );
};

export default About;
