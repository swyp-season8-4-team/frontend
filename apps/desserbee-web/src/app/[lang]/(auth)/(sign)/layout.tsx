import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { Header } from '@repo/design-system/components/Header';
import BackButton from '../../_components/BackButton';
import { MobileScreenProvider } from '../../_contexts/MobileScreenProvider';

export default async function SignLayout({ children }: WithChildren) {
  return (
    <MobileScreenProvider>
    <div className="flex flex-col min-h-screen max-h-screen overflow-hidden bg-white">
      <Header
        title="디저비"
        fontClass={recipeKorea.className}
        backButton={<BackButton />}
      />
      {children}
    </div>
    </MobileScreenProvider>
  );
}
