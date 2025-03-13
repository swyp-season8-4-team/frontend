'use client';

import IconDirection from '@repo/design-system/components/icons/IconDirection';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
}

export function MyPageSubMenuPageHeader({ title }: Props) {
  const router = useRouter();

  return (
    <header className="flex text-center items-center justify-start px-3 py-5 ">
      <button onClick={() => router.back()}>
        <div className="w-4 md:w-7 h-4 md:h-7">
          <IconDirection className="w-full h-full rotate-90" />
        </div>
      </button>
      <span className="font-semibold text-[14px] md:text-3xl">{title}</span>
    </header>
  );
}
