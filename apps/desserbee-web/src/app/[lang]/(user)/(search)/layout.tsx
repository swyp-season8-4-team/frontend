import type { WithChildren } from '@repo/ui/index';
import { recipeKorea } from '@/app/fonts';
import { HeaderContainer } from './_components/HeaderContainer';
import NavigationContainer from './_components/NavigationContainer';
import { SearchBarContainer } from './_components/SearchBarContainer';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <div className="bg-page text-default">
      <HeaderContainer fontClass={recipeKorea.className}>
        <SearchBarContainer />
      </HeaderContainer>
      {children}
      <NavigationContainer />
    </div>
  );
}
