import type { WithChildren } from '@repo/ui/index';
import { RegisterProvider } from './_contexts/RegisterContext';

export default function RegisterLayout({ children }: WithChildren) {
  return (
    <RegisterProvider>
      <div className="flex min-h-[100dvh] flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </RegisterProvider>
  );
}
