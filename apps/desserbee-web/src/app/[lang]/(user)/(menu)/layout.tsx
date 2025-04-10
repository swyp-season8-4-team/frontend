import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';
import { MobileScreenProvider } from '../../_contexts/MobileScreenProvider';

export default async function UserMenuLayout({ children }: WithChildren) {
  return (
    <MobileScreenProvider>
      <div className="text-default relative">
        {children}

        <NavigationContainer />
      </div>
    </MobileScreenProvider>
  );
}
