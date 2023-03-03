import { Meta, StoryObj } from "@storybook/react";
import { BaseHeader } from ".";

const meta: Meta<typeof BaseHeader> = {
  component: BaseHeader,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Default: StoryObj<typeof BaseHeader> = {
  args: {
    currentPath: "home",
  },
};
