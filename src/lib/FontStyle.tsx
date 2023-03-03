"use client";
import { inter } from "./fonts";

export const FontStyle = () => {
  return (
    <style jsx global>
      {`
        :root {
          --font-inter: ${inter.style.fontFamily};
        }
      `}
    </style>
  );
};
