import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';

export default async function UserLayout({ children }: WithChildren) {
  return (
    <div className="bg-page h-dvh text-default">
      {children}
      <NavigationContainer />
    </div>
  );
}
