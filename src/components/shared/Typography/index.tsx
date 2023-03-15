import clsx from "clsx";
import { createElement, Fragment } from "react";
import { loadDefaultJapaneseParser } from "budoux";
import styles from "./index.module.css";

type Props = {
  children: string;
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
    | "bold";
  className?: string;
};

export const Typography = ({ children, variant, className }: Props) => {
  const parser = loadDefaultJapaneseParser();
  const text = parser.parse(children);

  if (!variant) {
    return createElement(
      Fragment,
      undefined,
      <>
        {text.map((text) => (
          <>
            {text}
            <wbr />
          </>
        ))}
      </>
    );
  }
  return createElement(
    variant,
    { className: clsx(styles.typography, className) },
    <>
      {text.map((text, i) => (
        <Fragment key={`${text}__${i}`}>
          {text}
          <wbr />
        </Fragment>
      ))}
    </>
  );
};
