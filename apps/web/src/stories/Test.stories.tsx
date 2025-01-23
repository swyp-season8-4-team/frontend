import type { Meta, StoryObj } from "@storybook/react";

interface TestProps {
  className?: string;
}

const Test = ({ className = "" }: TestProps) => {
  return <div className={className}>test</div>;
};

const meta = {
  title: "Theme/ThemeTest",
  component: Test,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Test>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DarkMode: Story = {
  args: {
    className: "dark",
  },
};

export const SmallText: Story = {
  args: {
    className: "text-sm",
  },
};

export const LargeText: Story = {
  args: {
    className: "text-2xl",
  },
};
