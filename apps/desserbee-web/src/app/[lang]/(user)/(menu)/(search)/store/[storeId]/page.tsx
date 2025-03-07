import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { DetailContainer } from './_components/(detail)/DetailContainer';
import NotFound from '@/app/[lang]/[...not-found]/page';
import { headers } from 'next/headers';
// import { storeDetail } from '../../map/_consts/marker';

interface StoreDetailPageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  const headersList = await headers();
  const userUuid = headersList.get('X-User-UUID');

  const storeId = (await params).storeId;

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  if (!storeId) {
    return <NotFound />;
  }

  const storeDetail = await storeService.getStoreDetail({
    storeUuid: storeId,
    ...(userUuid && { userUuid }),
  });

  const storeDetails = storeDetail;

  //TODO: 영민님이 userUuid sub에 담아서 보내도록 수정하면 제대로 되는지 확인해야함
  if (storeDetail.savedListId) {
    const parentListInfo = await storeService.getParentSavedList({
      listId: storeDetail.savedListId,
    });

    return (
      <DetailContainer
        storeDetail={storeDetails}
        parentlistInfo={parentListInfo}
      />
    );
  } else {
    return <DetailContainer storeDetail={storeDetail} />;
  }
}
