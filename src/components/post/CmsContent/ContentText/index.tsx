import { Typography } from "@/components/shared/Typography";
import { Text } from "@/types/cms";
import { FC } from "react";

type Props = {
  content: Text;
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "span"
    | "div"
    | "li"
    | "code"
    | "s"
    | "bold"
    | "a";
};

export const ContentText: FC<Props> = ({ content, variant }) => {
  if (content.value === "\n") return <br />;
  if (variant === "a") {
    return (
      <a
        href={content.attributes?.link}
        target={content.attributes?.target}
        rel={content.attributes?.rel}
      >
        <Typography variant={undefined}>{content.value}</Typography>
      </a>
    );
  }
  return <Typography variant={variant}>{content.value}</Typography>;
};
