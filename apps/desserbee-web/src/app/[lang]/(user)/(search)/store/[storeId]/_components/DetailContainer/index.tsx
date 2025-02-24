'use client';

import { useRouter } from 'next/navigation';

import type { Menu, StoreDetailInfoData } from '@repo/entity/src/store';
import { StorePictureList } from '../StorePictureList';
import { DetailInfoContainer } from '../DetailInfoContainer';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import IconX from '@repo/design-system/components/icons/IconX';
import { NavigationPathname } from '@repo/entity/src/navigation';

interface DetailContainerProps {
  storeDetail: StoreDetailInfoData;
}

export function DetailContainer({ storeDetail }: DetailContainerProps) {
  const router = useRouter();

  if (!storeDetail) throw Error('store 상세 정보 불러오기 실패');

  const getAllMenuImages = (menus: Menu[]): string[] => {
    return menus.reduce((allImages: string[], menu) => {
      const menuImages = menu.images || [];
      return [...allImages, ...menuImages];
    }, []);
  };

  const storePicureListProps = {
    storeImages: storeDetail.storeImages,
    menuImages: getAllMenuImages(storeDetail.menus),
  };

  const detailInfoContainerProps = {
    // DetailInfoContainer에서 사용하는 필드
    name: storeDetail.name,
    animalYn: storeDetail.animalYn,
    tumblerYn: storeDetail.tumblerYn,
    parkingYn: storeDetail.parkingYn,
    averageRating: storeDetail.averageRating,
    tags: storeDetail.tags,
    address: storeDetail.address,
    operatingHours: storeDetail.operatingHours,
    phone: storeDetail.phone,
    storeLink: storeDetail.storeLink,
    description: storeDetail.description,
    contents: ['비건', '로우슈거', '글루텐프리'],
    storeImages: storeDetail.storeImages,
    ownerPickImages: storeDetail.ownerPickImages,
    latitude: storeDetail.latitude,
    longitude: storeDetail.longitude,
    holidays: storeDetail.holidays,
    notice: storeDetail.notice,

    // StoreDetailInfoData의 추가 필드들
    storeId: storeDetail.storeId,
    storeUuid: storeDetail.storeUuid,
    topPreferences: storeDetail.topPreferences,
    userId: storeDetail.userId,
    userUuid: storeDetail.userUuid,
    ownerId: storeDetail.ownerId,
    ownerUuid: storeDetail.ownerUuid,
    menus: storeDetail.menus,
    totalReviewCount: storeDetail.totalReviewCount,
    storeReviews: storeDetail.storeReviews,
    mate: storeDetail.mate,
    saved: storeDetail.saved,
    savedListId: storeDetail.savedListId,
  };
  const handleBack = () => {
    router.back();
  };

  const handleGoMap = () => {
    router.replace(NavigationPathname.Map);
  };

  return (
    <>
      <header className="flex justify-between items-center shadow-base px-4 md:px-6 py-5 md:py-[46px] w-full">
        <button onClick={handleBack} className="w-[21px] md:w-[40px]">
          <IconDirection className="w-full h-full text-[#6F6F6F] rotate-90 transform" />
        </button>
        <button onClick={handleGoMap} className="w-[20px] md:w-[40px]">
          <IconX className="w-full h-full text-[#6F6F6F]" />
        </button>
      </header>
      <div className="px-base">
        <StorePictureList {...storePicureListProps} />
        <DetailInfoContainer {...detailInfoContainerProps} />
      </div>
      <div></div>
    </>
  );
}
