import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';

export default async function UserMenuLayout({ children }: WithChildren) {
  return (
    <div className="relative text-default">
      {children}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <NavigationContainer />
      </div>
    </div>
  );
}
