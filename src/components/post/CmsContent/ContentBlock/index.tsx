import { Typography } from "@/components/shared/Typography";
import { Block } from "@/types/cms";
import { createElement, FC } from "react";
import { ContentText } from "../ContentText";

type Props = {
  content: Block;
};
export const ContentBlock: FC<Props> = ({ content }) => {
  const tagName = () => {
    if (content.attributes?.header !== undefined) {
      return `h${content.attributes.header}`;
    }
    if (content.attributes?.["code-block"] !== undefined) {
      return "code";
    }
    if (content.attributes?.list !== undefined) {
      if (content.attributes.list === "ordered") {
        return "ol";
      }
      return "ul";
    }
    return "p";
  };

  const childVariant = () => {
    if (content.attributes?.header !== undefined) {
      return undefined;
    }
    if (content.attributes?.["code-block"] !== undefined) {
      return undefined;
    }
    if (content.attributes?.list !== undefined) {
      if (content.attributes.list === "ordered") {
        return "li";
      }
      return "li";
    }
    return "p";
  };

  return createElement(
    tagName(),
    {
      style:
        childVariant === undefined
          ? {
              wordBreak: "keep-all",
              overflowWrap: "break-word",
            }
          : {},
    },
    <>
      {content.value.map((text, i) => (
        <ContentText
          key={`${text.value}__${i}`}
          content={text}
          variant={childVariant()}
        />
      ))}
    </>
  );
};
