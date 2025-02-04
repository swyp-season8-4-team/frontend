import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@repo/ui/components/button";

interface TailwindConfigestProps {
  className?: string;
  text?: string;
}

const TailwindConfigTest = ({ className, text }: TailwindConfigestProps) => {
  return (
    <div className={className + "bg-gray-200 w-60 h-60"}>
      <div className="bg-black w-full h-full dark:text-white">
        {text}
        <br />
        <Button className={className}>shadcn 버튼</Button>
        <div className={className + " w-40 h-36 bg-primary text-center"}>
          border
        </div>
      </div>
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
    text: "className='text-primary'",
  },
};

export const Secondary: Story = {
  args: {
    className: "text-secondary ",
    text: "className='text-secondary'",
  },
};

export const Disabled: Story = {
  args: {
    className: "text--disabled ",
    text: "className='text-disabled'",
  },
};

export const BorderRadius: Story = {
  args: {
    className: "rounded-base",
    text: "className='rounded-base'",
  },
};

// 패딩 (spacing)
export const Base_PX_PY: Story = {
  args: {
    className: "text-white px-base py-base ",
    text: "className='px-base py-base'",
  },
};
