import clsx from "clsx";
import { FC, createElement, Fragment } from "react";
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

export const Typography = (async ({
  children,
  variant,
  className,
}: Props): Promise<JSX.Element> => {
  const data = await fetch(`${process.env.URL}/api/texts?text=${children}`, {
    // method: "POST",
    cache: "force-cache",
    // body: JSON.stringify({
    //   text: children,
    // }),
  });
  const text = (await data.json()) as { text: string[] };

  if (!variant) {
    return createElement(
      Fragment,
      undefined,
      <>
        {text.text.map((text) => (
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
      {text.text.map((text) => (
        <>
          {text}
          <wbr />
        </>
      ))}
    </>
  );
}) as unknown as FC<Props>;
