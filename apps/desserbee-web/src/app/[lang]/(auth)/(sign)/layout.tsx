import type { WithChildren } from '@repo/ui/index';
import { MobileScreenProvider } from '../../_contexts/MobileScreenProvider';

export default async function SignLayout({ children }: WithChildren) {
  return <MobileScreenProvider>{children}</MobileScreenProvider>;
}
