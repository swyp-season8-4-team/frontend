'use client';

import IconXRound from '@repo/design-system/components/icons/IconXRound';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function GoOwnerPageModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideUntil = localStorage.getItem('hideOwnerModalUntil');
    if (!hideUntil || new Date().getTime() >= parseInt(hideUntil)) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleGoOwnerPageButtonClick = () => {
    router.push(NavigationPathname.Owner);
  };

  const handleNotTodayClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      localStorage.setItem(
        'hideOwnerModalUntil',
        tomorrow.getTime().toString(),
      );
      setIsOpen(false);
    }
  };

  return (
    <div className="z-modal animate-fadeIn fixed inset-0 mx-auto flex max-w-screen-md items-center justify-center bg-black/10 opacity-0">
      <div className="relative overflow-hidden rounded-md bg-white shadow-md">
        <div className="h-[200px] w-[200px] md:h-[300px] md:w-[300px]">
          <Image
            src="/image/owner-popup.webp"
            alt="팝업 이미지"
            width={300}
            height={300}
            priority
          />
        </div>

        <button
          onClick={() => setIsOpen(false)}
          className="z-modal absolute right-3 top-3 h-4 w-4 md:right-4 md:top-4 md:h-5 md:w-5"
          aria-label="닫기"
        >
          <IconXRound className="text-neutral-30 h-full w-full" />
        </button>
        <div className="z-modal absolute bottom-7 right-1/2 flex w-full translate-x-1/2 flex-col items-center justify-center gap-1 md:bottom-10">
          <button
            className="h-[30px] w-[calc(100%-32px)] cursor-pointer rounded-[60px] bg-[#F28627] text-xs font-medium text-white md:h-[48px] md:text-lg"
            onClick={handleGoOwnerPageButtonClick}
          >
            디저비에 가게 등록하러 가기
          </button>
        </div>
        <button className="flex w-full items-center gap-1 py-1 pl-2 md:-bottom-6 md:py-2 md:pl-4">
          <input
            type="checkbox"
            id="not-today"
            className="h-[15px] w-[15px] md:h-5 md:w-5"
            onChange={handleNotTodayClick}
          />
          <label
            htmlFor="not-today"
            className="text-neutral-40 w-full cursor-pointer text-start text-[10px] md:text-[14px]"
          >
            오늘 하루 다신 보지 않기
          </label>
        </button>
      </div>
    </div>
  );
}
