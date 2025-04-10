import BackButton from '@/app/[lang]/_components/BackButton';
import { recipeKorea } from '@/app/fonts';
import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui';
import SearchIconButton from './_components/SearchIconButton';
import { Logo } from '@/app/[lang]/_components/Logo';

export default async function CommunityDessertLayout({
  children,
}: WithChildren) {
  return (
    <>
      <Header
        backButton={<BackButton iconClassName="text-white" />}
        title="디저비 커뮤니티"
        fontClass={recipeKorea.className}
        searchIcon={<SearchIconButton iconClassName="text-white" />}
        logo={<Logo height={20} width={20} />}
      />
      {children}
    </>
  );
}
