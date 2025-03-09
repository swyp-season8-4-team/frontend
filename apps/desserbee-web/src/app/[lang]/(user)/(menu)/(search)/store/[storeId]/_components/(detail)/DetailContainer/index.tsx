'use client';

import type {
  Menu,
  ParentSavedListResponse,
  StoreDetailInfoData,
} from '@repo/entity/src/store';
import { StorePictureList } from '../StorePictureList';
import { DetailInfoContainer } from '../DetailInfoContainer';

import { TabContainer } from '../../(tabs)/TabContainer';
import { DetailPageHeader } from '../../Header';

interface DetailContainerProps {
  storeDetail: StoreDetailInfoData;
  parentlistInfo?: ParentSavedListResponse;
}

export function DetailContainer({
  storeDetail,
  parentlistInfo,
}: DetailContainerProps) {
  if (!storeDetail) throw Error('store 상세 정보 불러오기 실패');
  const getAllMenuImages = (menus: Menu[]): string[] => {
    return menus.reduce((allImages: string[], menu) => {
      const menuImages = menu.images || [];
      return [...allImages, ...menuImages];
    }, []);
  };

  const storePicureListProps = {
    ownerPickImages: storeDetail.ownerPickImages,
    menuImages: getAllMenuImages(storeDetail.menus),
  };

  const detailInfoContainerProps = {
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
    storeImages: storeDetail.storeImages,
    ownerPickImages: storeDetail.ownerPickImages,
    latitude: storeDetail.latitude,
    longitude: storeDetail.longitude,
    holidays: storeDetail.holidays,
    notice: storeDetail.notice,
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
    parentlistInfo,
  };

  const tabContainerProps = {
    onelineReviews: {
      storeReviews: storeDetail.storeReviews,
      totalReviewCount: storeDetail.totalReviewCount,
      averageRating: storeDetail.averageRating,
    },
    menus: storeDetail.menus,
    mate: storeDetail.mate,
    communityReviews: storeDetail.communityReviews,
  };

  return (
    <>
      <DetailPageHeader />
      <div className="px-base bg-white">
        <StorePictureList {...storePicureListProps} />
        <DetailInfoContainer {...detailInfoContainerProps} />
        <TabContainer {...tabContainerProps} />
      </div>
    </>
  );
}
