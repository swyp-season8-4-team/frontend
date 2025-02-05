import localFont from 'next/font/local';
import { Header } from '@repo/design-system/components/Header';
import { NavBar } from '@repo/design-system/components/NavBar';
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

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-page h-dvh">
      <Header
        SearchBar={<SearchBarWithHook />}
        fontClass={recipeKorea.className}
      />
      {children}
      <NavBar />
    </div>
  );
}
