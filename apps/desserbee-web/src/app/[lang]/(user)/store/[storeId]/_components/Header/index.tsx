'use client';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';

import IconDirection from '@repo/design-system/components/icons/IconDirection';
import IconX from '@repo/design-system/components/icons/IconX';

export function DetailPageHeader() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleGoMap = () => {
    router.replace(NavigationPathname.Map);
  };

  return (
    <header className="flex justify-between items-center shadow-base px-4 md:px-6 py-5 md:py-[46px] w-full">
      <button onClick={handleBack} className="w-[21px] md:w-[40px]">
        <IconDirection className="w-full h-full text-[#6F6F6F] rotate-90 transform" />
      </button>
      <button onClick={handleGoMap} className="w-[20px] md:w-[40px]">
        <IconX className="w-full h-full text-[#6F6F6F]" />
      </button>
    </header>
  );
}
