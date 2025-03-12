import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { HeaderContainer } from '../../(user)/(menu)/(search)/_components/HeaderContainer';
import { Header } from '@repo/design-system/components/Header';
import BackButton from '../../_components/BackButton';

export default async function SignLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-white">
      <Header
        title="디저비"
        fontClass={recipeKorea.className}
        backButton={<BackButton />}
      />
      {children}
    </div>
  );
}
