import style from "./page.module.css";

export const metadata = {
  title: "About",
  description: "Web frontend engineer",
};

const About = () => {
  return (
    <main className={style.page}>
      <h1>About</h1>
      <p>Web frontend engineer</p>
    </main>
  );
};

export default About;
