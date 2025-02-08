import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui/index';
import localFont from 'next/font/local';
import NavigationContainer from './_components/NavigationContainer';
import { SearchBarWithHook } from './_components/SearchBarWithHook';

const recipeKorea = localFont({
  src: [
    {
      path: '../../fonts/RecipeKorea.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-recipe-korea',
});

export default async function UserLayout({
  children
}: WithChildren) {
  return (
    <div className="bg-page h-dvh">
      <Header fontClass={recipeKorea.className}>
        <SearchBarWithHook />
      </Header>
      {children}
      <NavigationContainer />
    </div>
  );
}
