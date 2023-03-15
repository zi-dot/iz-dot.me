import { BaseHead } from "@/components/shared/BaseHead";
import style from "./index.module.css";

export const metadata = {
  title: "About",
  description: "Web frontend engineer",
};

const About = () => {
  return (
    <>
      <BaseHead title="about | zi / @iz_dot" description="zi's posts" />
      <div className={style.box}>
        <h1 style={{ marginBottom: "16px" }}>About</h1>
        <p> 🚧 Under construction </p>
      </div>
    </>
  );
};

export default About;
