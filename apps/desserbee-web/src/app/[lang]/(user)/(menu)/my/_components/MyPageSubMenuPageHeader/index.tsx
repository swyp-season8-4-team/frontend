'use client';

import IconButton from '@repo/design-system/components/buttons/IconButton';
import { IconSize } from '@repo/design-system/components/icons';
import IconChevronLeft from '@repo/design-system/components/icons/IconChevronLeft';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
}

export function MyPageSubMenuPageHeader({ title }: Props) {
  const router = useRouter();

  return (
    <header
      className="flex text-center items-center justify-start px-4 py-5 md:py-[34px] gap-[4px]"
    >
      <IconButton size={IconSize.s} onClick={() => router.back()}>
        <IconChevronLeft size={IconSize.s} />
      </IconButton>
      <span className="font-semibold text-[14px]">{title}</span>
    </header>
  );
}
