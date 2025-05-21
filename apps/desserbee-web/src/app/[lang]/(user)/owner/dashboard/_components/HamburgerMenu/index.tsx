'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import NavigationService from '@repo/usecase/src/navigationService';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { usePathname } from 'next/navigation';

const navigationService = new NavigationService({});

type HamburgerMenuProps = {
  onClose: () => void;
  storeUuid: string;
};

export function HamburgerMenu({ onClose, storeUuid }: HamburgerMenuProps) {
  const pathname = usePathname(); // 현재 경로 가져오기

  type NavigationPathnameKey = keyof typeof NavigationPathname;
  const data: { name: string; Link: NavigationPathnameKey }[] = [
    { name: '내 가게 홈', Link: 'OwnerStoreList' },
    { name: '기본 정보 관리', Link: 'OwnerDashboard' },
    // { name: '운영 시간 관리', Link: undefined },
    { name: '메뉴 관리', Link: 'OwnerMenuLists' },
    { name: '공지 관리', Link: 'OwnerDashboardNotices' },
    { name: '쿠폰 등록', Link: 'OwnerRegisterCoupon' },
    { name: '통계 대시보드', Link: 'OwnerStatistics' },
    // { name: '트렌드 리포트', Link: undefined },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white bg-opacity-95">
      {/* 닫기 버튼 */}
      <div className="flex justify-end p-4">
        <button
          className="text-2xl text-[#9F9F9F] hover:text-[#7A7A7A]"
          aria-label="메뉴 닫기"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      {/* 메뉴 리스트 */}
      <nav className="flex flex-1 flex-col gap-2 px-6 text-[#6D6D6D]">
        {data.map((item, idx) => {
          const pathnameStr = navigationService.getHref(
            NavigationPathname[item.Link],
          );
          const href = {
            pathname: pathnameStr,
            query: { storeUuid },
          };
          const isActive = pathname === pathnameStr; // 현재 경로와 href가 같으면 isActive가 true

          return (
            <Link
              key={item.name}
              href={href}
              onClick={onClose}
              className={`flex cursor-pointer items-center rounded px-2 py-3 text-lg hover:bg-[#f3f3f3] ${
                isActive ? 'bg-[#ededed] font-semibold text-[#9F9F9F]' : ''
              }`}
            >
              {item.name}
              {item.name === '트렌드 리포트' && (
                <span className="ml-2 rounded-xl bg-[#6C4CE3] px-2 py-0.5 text-xs text-white">
                  유료
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto h-[28px] w-full bg-[#EBEBEB]" />
    </div>
  );
}
