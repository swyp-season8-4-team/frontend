import type { WithChildren } from '@repo/ui/index';
import { recipeKorea } from '@/app/fonts';
import { HeaderContainer } from './_components/HeaderContainer';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <>
      <HeaderContainer fontClass={recipeKorea.className} />
      {children}
    </>
  );
}
