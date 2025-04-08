import { recipeKorea } from '@/app/fonts';
import type { WithChildren } from '@repo/ui/index';
import { Header } from '@repo/design-system/components/Header';
import BackButton from '../../_components/BackButton';
import { MobileScreenProvider } from '../../_contexts/MobileScreenProvider';
import { Logo } from '../../_components/Logo';

export default async function SignLayout({ children }: WithChildren) {
  return (
    <MobileScreenProvider>
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden bg-white">
        <Header
          title="디저비"
          fontClass={recipeKorea.className}
          backButton={<BackButton />}
          logo={<Logo height={20} width={20} />}
        />
        {children}
      </div>
    </MobileScreenProvider>
  );
}
