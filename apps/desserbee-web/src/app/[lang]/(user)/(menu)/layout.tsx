import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';

export default async function UserMenuLayout({ children }: WithChildren) {

  return (
    <div className="bg-page h-[100dvh] text-default">
      {children}
      <NavigationContainer />
    </div>
  );
}
