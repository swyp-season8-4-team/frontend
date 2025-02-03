import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../components/Tag";

const meta = {
  title: "Theme/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: { control: "text" },
    isSelected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "태그",
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    children: "태그",
    isSelected: true,
  },
};
