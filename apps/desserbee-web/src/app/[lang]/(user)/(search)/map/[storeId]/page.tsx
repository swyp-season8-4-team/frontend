'use client';
import { useParams } from 'next/navigation';
import { useStoreDetail } from '../../_hooks/useStoreDetail';
import { DetailInfoContainer } from '../_components/detail/DetailInfoContainer';
import { StorePictureList } from '../_components/detail/StorePictureList';

export default function StoreDetailPage() {
  const { storeId } = useParams();
  const { storeDetail } = useStoreDetail('uuid-1');

  if (!storeDetail) return null;

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
    <div className="w-full min-h-[100vh] h-fit bg-white absolute z-modal px-base">
      <div></div>
      <StorePictureList {...storePicureListProps} />
      <DetailInfoContainer {...detailInfoContainerProps} />
      <div></div>
    </div>
  );
}
