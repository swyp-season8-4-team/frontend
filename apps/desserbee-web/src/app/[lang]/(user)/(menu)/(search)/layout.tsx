import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { HeaderContainer } from './_components/HeaderContainer';
import { SearchBarContainer } from './_components/SearchBarContainer';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <div className="h-[100dvh] bg-page">
      <div className="relative z-[2] ">
        <HeaderContainer fontClass={recipeKorea.className}>
          <SearchBarContainer />
        </HeaderContainer>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
