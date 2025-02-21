import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { StorePictureList } from '../StorePictureList';
import { DetailInfoContainer } from '../DetailInfoContainer';

interface DetailContainerProps {
  storeDetail: StoreDetailInfoData;
}

export function DetailContainer({ storeDetail }: DetailContainerProps) {
  if (!storeDetail) throw Error('store 상세 정보 불러오기 실패');

  const storePicureListProps = {
    storeImages: storeDetail.storeImages,
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
    contents: ['비건', '로우슈거', '글루텐프리'],
    previewImages: storeDetail.storeImages,
    storeImages: storeDetail.storeImages,
    ownerPickImages: storeDetail.ownerPickImages,
    latitude: storeDetail.latitude,
    longitude: storeDetail.longitude,
    holidays: storeDetail.holidays,
    notice: storeDetail.notice,
  };

  return (
    <div className="z-modal absolute bg-white px-base w-full h-fit min-h-[100vh]">
      <StorePictureList {...storePicureListProps} />
      <DetailInfoContainer {...detailInfoContainerProps} />
      <div></div>
    </div>
  );
}
