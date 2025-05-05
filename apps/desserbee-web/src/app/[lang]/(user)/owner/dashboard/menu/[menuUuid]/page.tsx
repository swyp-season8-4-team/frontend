'use client';
import { getMenu } from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import type { Menu } from '@repo/entity/src/store';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function MenuDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const menuUuid = params.menuUuid as string;
  const storeUuid = searchParams.get('storeUuid');

  const [menu, setMenu] = useState<Menu>();

  useEffect(() => {
    if (storeUuid && menuUuid) {
      const fetchMenu = async () => {
        try {
          const data = await getMenu({ storeUuid, menuUuid });
          setMenu(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchMenu();
    }
  }, [storeUuid, menuUuid]);

  console.log(menu);

  if (!menu) return null;
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto w-full p-6 md:w-[768px]">
        <div className="mb-6 flex items-center justify-center">
          <div className="relative h-96 w-96 flex-shrink-0 overflow-hidden">
            {menu?.images && menu.images.length > 0 && menu.images[0] ? (
              <Image
                fill
                src={menu.images[0]}
                alt="메뉴 사진"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{menu.name}</div>
          <div className="mt-1 text-lg font-semibold text-green-600">
            {menu.price.toLocaleString()}{' '}
            <span className="text-base text-gray-700">원</span>
          </div>
        </div>
        <hr className="mb-4 mt-2" />
        <div className="mb-6 min-h-[48px] whitespace-pre-line text-base leading-relaxed text-gray-700">
          {menu.description || (
            <span className="text-gray-400">설명이 없습니다.</span>
          )}
        </div>
        <OliveButton
          className="w-full py-3 text-lg"
          text="수정하기"
        />
      </div>
    </div>
  );
}
