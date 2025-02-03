import type { Decorator, Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "@repo/ui/styles/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

// addon - theme
export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: {
      light: "",
      dark: "dark",
    },
    defaultTheme: "light",
  }),
];
