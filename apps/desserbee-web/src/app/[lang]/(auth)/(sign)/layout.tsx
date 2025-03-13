import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { Header } from '@repo/design-system/components/Header';
import BackButton from '../../_components/BackButton';

export default async function SignLayout({ children }: WithChildren) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-white">
      <Header
        title="디저비"
        fontClass={recipeKorea.className}
        backButton={<BackButton />}
      />
      {children}
    </div>
  );
}
