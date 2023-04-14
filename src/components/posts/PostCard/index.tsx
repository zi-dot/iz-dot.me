import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { FC } from "react";
import styles from "./index.module.css";

type Props = {
  id: string;
  title: string;
  imageUrl: string;
  width: number;
  height: number;
  publishedAt: Date;
};

export const PostCard: FC<Props> = ({
  id,
  title,
  imageUrl,
  width,
  height,
  publishedAt,
}) => {
  return (
    <article className={styles.card}>
      <Image
        src={imageUrl}
        width={width}
        height={height}
        alt=""
        className={styles["card-eyecatch"]}
        style={{
          viewTransitionName: `post-image-${id}`,
        }}
      />
      <p className={styles["card-publish-date"]}>{formatDate(publishedAt)}</p>
      <h3
        className={styles["card-title"]}
        style={{
          viewTransitionName: `post-title-${id}`,
        }}
      >
        {title}
      </h3>
    </article>
  );
};
