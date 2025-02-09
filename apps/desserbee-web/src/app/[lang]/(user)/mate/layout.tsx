import { recipeKorea } from "@/app/fonts";
import { Header } from "@repo/design-system/components/Header";
import type { WithChildren } from "@repo/ui/index";

export default async function MateLayout({ children }: WithChildren) {
  return (
    <>
      <Header title="디저트 메이트" fontClass={recipeKorea.className} />
      {children}
    </>
  );
}
  