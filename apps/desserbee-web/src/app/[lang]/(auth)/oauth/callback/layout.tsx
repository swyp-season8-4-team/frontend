import { recipeKorea } from '@/app/fonts';
import { Header } from '@repo/design-system/components/Header';
import type { WithChildren } from '@repo/ui/index';

export default async function OAuthCallbackLayout({ children }: WithChildren) {
  return (
    <div className="min-h-screen bg-white">
      <Header title="디저비" fontClass={recipeKorea.className} />
      {children}
    </div>
  );
}
