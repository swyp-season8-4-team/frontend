import type { Meta, StoryObj } from "@storybook/react";
interface TailwindConfigestProps {
  className?: string;
  text?: string;
}

const TailwindConfigTest = ({ className, text }: TailwindConfigestProps) => {
  return (
    <div className={className + "bg-red-400 w-60 h-60"}>
      <div className="bg-black w-full h-full dark:text-white">{text}</div>
    </div>
  );
};
const meta = {
  title: "Theme/TailwindConfig",
  component: TailwindConfigTest,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TailwindConfigTest>;

export default meta;
type Story = StoryObj<typeof meta>;

// color
export const Primary: Story = {
  args: {
    className: "text-primary ",
    text: "적용: className='text-primary'",
  },
};

export const Secondary: Story = {
  args: {
    className: "text-secondary ",
    text: "적용: className='text-secondary'",
  },
};

// 패딩 (spacing)
export const Base_PX_PY: Story = {
  args: {
    className: "px-base py-base ",
    text: "적용: className='px-base py-base'",
  },
};
