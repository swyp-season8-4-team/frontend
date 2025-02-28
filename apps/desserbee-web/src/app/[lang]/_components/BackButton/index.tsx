'use client';

import IconButton from '@repo/design-system/components/buttons/IconButton';
import { IconSize } from '@repo/design-system/components/icons';
import IconChevronLeft from '@repo/design-system/components/icons/IconChevronLeft';
import { useRouter } from 'next/navigation';

interface Props {
  buttonClassName?: string;
  iconClassName?: string;
  size?: IconSize | number;
}

export default function BackButton({ buttonClassName, iconClassName, size = IconSize.s }: Props) {
  const router = useRouter();

  return (
    <IconButton className={buttonClassName} onClick={() => router.back()}>
      <IconChevronLeft className={iconClassName} size={size} />
    </IconButton>
  )
}