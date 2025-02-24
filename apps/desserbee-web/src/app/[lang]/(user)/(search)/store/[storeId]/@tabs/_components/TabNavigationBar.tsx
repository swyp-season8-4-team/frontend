'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@repo/ui/lib/utils';

const TAB_ITEMS = [
  { id: 'menu', title: '메뉴' },
  { id: 'oneline-reviews', title: '한 줄 리뷰' },
  { id: 'community-reviews', title: '커뮤니티 리뷰' },
  { id: 'dessert-mate', title: '디저트 메이트' },
];

interface TabNavigationBarProps {
  storeId: string; // storeId
}

export default function TabNavigationBar({ storeId }: TabNavigationBarProps) {
  const activeSegment = useSelectedLayoutSegment();

  console.log('Current active segment:', activeSegment); // 현재 활성화된 세그먼트 확인

  return (
    <div className="flex gap-4 px-4 py-2">
      {TAB_ITEMS.map((tab) => (
        <Link
          key={tab.id}
          href={`/store/${storeId}/${tab.id}`}
          className={cn(
            'text-5',
            activeSegment === tab.id && 'text-primary font-bold',
          )}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
}
