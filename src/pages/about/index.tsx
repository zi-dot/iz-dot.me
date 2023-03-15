import style from "./index.module.css";

export const metadata = {
  title: "About",
  description: "Web frontend engineer",
};

const About = () => {
  return (
    <div className={style.box}>
      <h1 style={{ marginBottom: "16px" }}>About</h1>
      <p> 🚧 Under construction </p>
    </div>
  );
};

export default About;
