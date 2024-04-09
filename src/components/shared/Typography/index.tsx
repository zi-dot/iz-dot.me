import clsx from "clsx";
import { createElement } from "react";
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
  if (!variant) {
    return <>{children}</>;
  }
  return createElement(
    variant,
    { className: clsx(styles.typography, className) },
    <>{children}</>
  );
};
