import type { WithChildren } from '@repo/ui/index';
import { recipeKorea } from '@/app/fonts';
import { HeaderContainer } from './_components/HeaderContainer';
import NavigationContainer from './_components/NavigationContainer';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-col h-[100dvh] bg-page text-default">
      <HeaderContainer fontClass={recipeKorea.className} />
      <div className="flex-1">{children}</div>
      <NavigationContainer />
    </div>
  );
}
