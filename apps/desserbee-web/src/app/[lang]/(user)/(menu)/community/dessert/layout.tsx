import BackButton from "@/app/[lang]/_components/BackButton";
import { recipeKorea } from "@/app/fonts";
import { Header } from "@repo/design-system/components/Header";
import type { WithChildren } from "@repo/ui";
import SearchIconButton from "./_components/SearchIconButton";

export default async function CommunityDessertLayout({ children }: WithChildren) {
  return (
    <>
      <Header
        backButton={<BackButton iconClassName="text-white" />}
        title="디저비"
        fontClass={recipeKorea.className}
        searchIcon={<SearchIconButton iconClassName="text-white" />}
      />
      {children}
    </>
  );
}