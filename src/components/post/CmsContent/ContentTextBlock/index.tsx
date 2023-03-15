import { TextBlock } from "@/types/cms";
import { FC } from "react";
import { ContentText } from "../ContentText";

type Props = {
  content: TextBlock;
};
export const ContentTextBlock: FC<Props> = ({ content }) => {
  return (
    <p style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}>
      {content.value.map((text, i) => (
        <ContentText key={`${text.value}__${i}`} content={text} />
      ))}
    </p>
  );
};
