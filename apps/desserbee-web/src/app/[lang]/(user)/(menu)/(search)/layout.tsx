import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { HeaderContainer } from './_components/HeaderContainer';
import { SearchBarContainer } from './_components/SearchBarContainer';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <>
      <HeaderContainer fontClass={recipeKorea.className}>
        <SearchBarContainer />
      </HeaderContainer>
      {children}
    </>
  );
}
