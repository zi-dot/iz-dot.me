import type { Preview } from "@storybook/react";
import { inter } from "./../src/lib/fonts";
import "./../src/styles/global.css";
import React from "react";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <div>
        <style>{`:root { --font-inter: ${inter.style.fontFamily} }`}</style>
        <Story />
      </div>
    ),
  ],
};

export default preview;
