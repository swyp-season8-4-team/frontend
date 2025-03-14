'use client';

import IconBookmarkList from '@repo/design-system/components/icons/IconBookmarkList';
import IconCoupon from '@repo/design-system/components/icons/IconCoupon';
import IconPoint from '@repo/design-system/components/icons/IconPoint';
import IconSetting from '@repo/design-system/components/icons/IconSetting';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Link from 'next/link';
import { useContext, type ReactNode } from 'react';
import { CouponIsNotReadyModal } from '../../../(search)/map/_modals/CouponIsNotReadyModal';
import { useRouter } from 'next/navigation';
import { PointIsNotReadyModal } from '../../_modals/PointIsNotReadyModal';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import NavigationService from '@repo/usecase/src/navigationService';

interface IconMenuItem {
  icon: ReactNode;
  label: string;
  href: string;
}

const navigationService = new NavigationService({});

const storeService = new StoreService({
  storeRepository: new StoreAPIRepository(),
});

export default function MyIconMenu() {
  const menuItems: IconMenuItem[] = [
    {
      icon: <IconSetting size={18} viewBox={'0 0 18 18'} />,
      label: '프로필 설정',
      href: navigationService.getHref(NavigationPathname.MySetting),
    },
    {
      icon: <IconBookmarkList size={18} viewBox={'0 0 18 18'} />,
      label: '저장 목록',
      href: navigationService.getHref(NavigationPathname.MyBookmarkList),
    },
    {
      icon: <IconPoint size={18} viewBox={'0 0 18 18'} />,
      label: '포인트',
      href: navigationService.getHref(NavigationPathname.MyPoints),
    },
    {
      icon: <IconCoupon size={18} viewBox={'0 0 18 18'} />,
      label: '쿠폰',
      href: navigationService.getHref(NavigationPathname.MyCoupon),
    },
  ];

  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleIconBtnClick = async (
    e: React.MouseEvent,
    index: number,
    path: string,
  ) => {
    if (index === 2) {
      e.preventDefault();
      push('modal', {
        component: <PointIsNotReadyModal onClose={closeModal} />,
      });
    } else if (index === 3) {
      e.preventDefault();
      push('modal', {
        component: <CouponIsNotReadyModal onClose={closeModal} />,
      });
      await storeService.updateCouponCount();
    } else {
      router.push(path);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {menuItems.map((item, index) => (
        <button
          onClick={(e) => handleIconBtnClick(e, index, item.href)}
          key={index}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 flex items-center justify-center mb-2">
            {item.icon}
          </div>
          <span className="text-[14px] whitespace-nowrap text-gray-700">
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
