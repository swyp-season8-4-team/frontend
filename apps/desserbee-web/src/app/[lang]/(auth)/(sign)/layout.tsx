import { recipeKorea } from "@/app/fonts";
import type { WithChildren } from "@repo/ui/index";
import { HeaderContainer } from "../../(user)/(menu)/(search)/_components/HeaderContainer";

export default async function SignLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-white">
      <HeaderContainer fontClass={recipeKorea.className} />
      {children}
    </div>
  );
}
