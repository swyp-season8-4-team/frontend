import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { DetailContainer } from './_components/(detail)/DetailContainer';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';
// import { storeDetail } from '../../map/_consts/marker';

interface StoreDetailPageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  const storeId = (await params).storeId;

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  if (!storeId) {
    return <NotFound />;
  }

  const storeDetail = await storeService.getStoreDetail(storeId);
  const storeDetails = storeDetail;

  if (storeDetail.savedListId) {
    const parentListInfo = await storeService.getParentSavedList({
      listId: storeDetail.savedListId,
    });

    return (
      <DetailContainer
        storeDetail={storeDetails}
        parentlistInfo={parentListInfo} // 담은 가게임을 보여줄때
      />
    );
  } else {
    return <DetailContainer storeDetail={storeDetail} />;
  }
}
