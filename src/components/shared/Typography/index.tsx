import clsx from "clsx";
import { FC, createElement } from "react";
import styles from "./index.module.css";

type Props = {
  children: string;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
};

export const Typography = (async ({
  children,
  variant,
  className,
}: Props): Promise<JSX.Element> => {
  const data = await fetch(`${process.env.URL}/api/texts?text=${children}`, {
    cache: "force-cache",
  });
  const text = (await data.json()) as { text: string[] };
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
