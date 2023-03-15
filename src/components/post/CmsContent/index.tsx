import { Block, Image, Text, TextBlock } from "@/types/cms";
import { FC } from "react";
import styles from "./index.module.css";

type Props = {
  content?: (Text | Block | TextBlock | Image)[];
};
export const CmsContent: FC<Props> = ({ content }) => {
  if (content === undefined || content?.length < 1) return null;
  return (
    <div className={styles["article"]}>
      {content.map((content, i) => {
        if (content.type === "text") return <p key={i}>{content.value}</p>;
      })}
    </div>
  );
};
