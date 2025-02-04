import localFont from 'next/font/local';
import IconSearch from '@repo/design-system/components/icons/IconSearch';
import SearchForm from './_components/SearchForm';
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

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="flex flex-col gap-[12px] pt-[32px] px-[16px] bg-[#ffb700] h-[174px]">
        <h1 className={`${recipeKorea.className} text-[30px] leading-[39px]`}>디저비</h1>
        <SearchForm icon={<IconSearch />} />
      </header>
      {children}
    </>
  );
}
