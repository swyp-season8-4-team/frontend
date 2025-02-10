import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui/index';
import { SearchBarContainer } from './_components/SearchBarContainer';
import { recipeKorea } from '@/app/fonts';

export default function UserSearchLayout({ children }: WithChildren) {
  return (
    <>
      <Header title="디저비" fontClass={recipeKorea.className}>
        <SearchBarContainer />
      </Header>
      {children}
    </>
  );
}
