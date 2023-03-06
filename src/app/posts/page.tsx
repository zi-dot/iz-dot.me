import style from "./page.module.css";

export const metadata = {
  title: "About",
  description: "Web frontend engineer",
};

const About = () => {
  return (
    <div className={style.box}>
      <h1 style={{ marginBottom: "16px" }}>Posts</h1>
      <p> 🚧 Under construction </p>
    </div>
  );
};

export default About;
