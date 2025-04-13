'use client';

import ownerPopupImage from '@/assets/images/owner-popup.png';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import { NavigationPathname } from '@repo/entity/src/navigation';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function GoOwnerPageModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return;
  const handleGoOwnerPageButtonClick = () => {
    router.push(NavigationPathname.Owner);
  };
  return (
    <div className="z-modal fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md shadow-md md:h-[300px] md:w-[300px]">
        <Image
          src={ownerPopupImage}
          alt="owner-popup-img"
          fill
          className="object-cover"
        />
        <button
          onClick={() => setIsOpen(false)}
          className="z-modal absolute right-3 top-4 h-4 w-4"
        >
          <IconXRound className="text-neutral-30 h-full w-full" />
        </button>
        <button
          className="z-modal absolute bottom-[10px] right-1/2 h-[30px] w-[calc(100%-32px)] translate-x-1/2 cursor-pointer md:bottom-[15px] md:h-[48px]"
          onClick={handleGoOwnerPageButtonClick}
        />
      </div>
    </div>
  );
}
