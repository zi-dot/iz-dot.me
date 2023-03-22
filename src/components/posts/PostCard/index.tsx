import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { FC } from "react";
import styles from "./index.module.css";

type Props = {
  title: string;
  imageUrl: string;
  publishedAt: Date;
};

export const PostCard: FC<Props> = ({ title, imageUrl, publishedAt }) => {
  return (
    <article className={styles.card}>
      <Image
        src={imageUrl}
        width="294"
        height="130"
        alt=""
        className={styles["card-eyecatch"]}
      />
      <p className={styles["card-publish-date"]}>{formatDate(publishedAt)}</p>
      <h3 className={styles["card-title"]}>{title}</h3>
    </article>
  );
};
