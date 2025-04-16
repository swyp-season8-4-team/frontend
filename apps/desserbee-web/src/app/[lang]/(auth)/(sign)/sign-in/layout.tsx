import type { WithChildren } from '@repo/ui/index';
import { Header } from '@repo/design-system/components/Header';
import { Logo } from '@/app/[lang]/_components/Logo';
import { recipeKorea } from '@/app/fonts';
export default async function SignInLayout({ children }: WithChildren) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-y-scroll bg-white">
      <Header
        title="디저비"
        logo={<Logo width={20} height={20} />}
        fontClass={recipeKorea.className}
      />
      <div className="pt-[50px]">{children}</div>
    </div>
  );
}
