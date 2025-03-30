'use client';

import { useContext, useEffect, useState } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import type { Menu } from '@repo/entity/src/store';
import { MenuAddModal } from '../_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';

export default function RegisterMenuPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const {
    storeData,
    updateMenus,
    updateMenuImages,
    completeStep,
    goToNextStep,
  } = useRegister();

  const [menus, setMenus] = useState<Menu[]>(storeData.menus || []);
  const [menuImageFiles, setMenuImageFiles] = useState<File[]>(
    storeData.menuImageFiles || [],
  );
  const [thumnailUrls, setThumbnailUrls] = useState<string[]>([]);

  const openMenuAddModal = () => {
    push('modal', {
      component: <MenuAddModal onClose={closeMenuAddModal} />,
    });
  };

  const closeMenuAddModal = (menu?: Menu, files?: File[]) => {
    if (menu) {
      setMenus((prev) => [...prev, menu]);
      if (files?.length) {
        setMenuImageFiles((prev) => [...prev, ...files]);
      }
    }
    pop('modal');
  };

  const handleDeleteMenu = (index: number) => {
    // 삭제할 썸네일의 URL 메모리 해제
    URL.revokeObjectURL(thumnailUrls[index]);

    setMenus((prev) => prev.filter((_, i) => i !== index));
    setMenuImageFiles((prev) => prev.filter((_, i) => i !== index));
    setThumbnailUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    updateMenus(menus);
    updateMenuImages(menuImageFiles);

    completeStep(RegisterStep.MENU);

    goToNextStep();

    router.push(`${NavigationPathname.OwnerRegisterCheck}`);
  };

  useEffect(() => {
    // 이미지 파일이 변경될 때마다 URL 생성
    const urls = menuImageFiles.map((file) => URL.createObjectURL(file));
    setThumbnailUrls(urls);

    // cleanup function
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [menuImageFiles]);

  return (
    <form onSubmit={handleNextStep} className="px-base">
      <button
        onClick={openMenuAddModal}
        type="button"
        className="w-full rounded-[10px] border border-[#949494] bg-[#F5F5F5] px-[14px] py-[10px]"
      >
        + 새 메뉴 추가
      </button>
      <div className="flex flex-col divide-y">
        {menus.map(({ name, price, description }, index) => (
          <div key={`${name}-${index}`} className="flex gap-3 py-3">
            {thumnailUrls[index] && (
              <div className="h-[68px] w-[68px] overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#F5F5F5]">
                <Image
                  width={100}
                  height={100}
                  src={thumnailUrls[index]}
                  alt={`메뉴 사진 ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col justify-center">
              <div className="font-medium">{name}</div>
              <div className="text-[#757575]">{description}</div>
              <div className="font-medium">{price.toLocaleString()}원</div>
            </div>
            <button
              type="button"
              className="self-center p-2"
              onClick={() => handleDeleteMenu(index)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4 flex gap-x-2">
        <button
          type="button"
          className="w-[20%] text-nowrap rounded-[99px] border border-[#B3B3B3] p-[10px]"
        >
          이전
        </button>
        <button
          type="submit"
          className="w-[80%] rounded-[99px] bg-[#FFB700] p-[10px] text-center"
        >
          적용
        </button>
      </div>
    </form>
  );
}
