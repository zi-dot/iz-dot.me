import { FC } from "react";
import styles from "./index.module.css";

type Props = {
  html: string;
};
export const PostContent: FC<Props> = ({ html }) => {
  return (
    <article
      className={styles.cms}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
