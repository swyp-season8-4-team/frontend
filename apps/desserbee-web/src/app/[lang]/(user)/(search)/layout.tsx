import { Header } from "@repo/design-system/components/Header";
import type { WithChildren } from "@repo/ui/index";
import localFont from "next/font/local";
import { SearchBarWithHook } from "./_components/SearchBarWithHook";

const recipeKorea = localFont({
  src: [
    {
      path: '../../../fonts/RecipeKorea.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-recipe-korea',
});

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <>
      <Header fontClass={recipeKorea.className}>
        <SearchBarWithHook />
      </Header>
      {children}
    </>
  );
}
