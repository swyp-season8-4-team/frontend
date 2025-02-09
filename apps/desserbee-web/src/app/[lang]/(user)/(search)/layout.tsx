import { Header } from "@repo/design-system/components/Header";
import type { WithChildren } from "@repo/ui/index";
import { SearchBarWithHook } from "./_components/SearchBarWithHook";
import { recipeKorea } from "@/app/fonts";

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <>
      <Header title="디저비" fontClass={recipeKorea.className}>
        <SearchBarWithHook />
      </Header>
      {children}
    </>
  );
}
