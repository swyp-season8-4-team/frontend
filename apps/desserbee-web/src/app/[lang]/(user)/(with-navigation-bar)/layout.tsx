import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from '../_components/NavigationContainer';

export default function WithNavigationBar({ children }: WithChildren) {
  return (
    <div>
      {children}
      <NavigationContainer />
    </div>
  );
}
