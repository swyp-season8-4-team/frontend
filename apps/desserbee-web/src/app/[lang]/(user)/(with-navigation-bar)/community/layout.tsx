import { recipeKorea } from '@/app/fonts';
import { HeaderContainer } from '../../_components/HeaderContainer';

export default async function CommunityLayout({
  children,
}: {
  bottomSheet: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="fixed top-0 w-full">
        <HeaderContainer fontClass={recipeKorea.className} />
      </div>
      {children}
    </div>
  );
}
