import { Button } from "@/components/ui/button";
import { handlers } from "@/mocks/handlers";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

interface TestProps {
  className?: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

const Test = ({ className = "" }: TestProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://example.com/user");
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  if (!user) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={className}>
      <div>
        <p>이름: {user.firstName}</p>
        <p>성: {user.lastName}</p>
        <p>ID: {user.id}</p>
      </div>
      <Button>Shadcn 버튼</Button>
    </div>
  );
};

const meta = {
  title: "Theme/ThemeTest",
  component: Test,
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers: handlers,
    },
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
