import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';

export default function UserMenuLayout({ children }: WithChildren) {
  return (
    <div className="bg-page text-default">
      {children}
      <NavigationContainer />
    </div>
  );
}
