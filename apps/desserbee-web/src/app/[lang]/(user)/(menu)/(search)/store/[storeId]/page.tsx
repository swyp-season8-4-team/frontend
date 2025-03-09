import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { DetailContainer } from './_components/(detail)/DetailContainer';
import NotFound from '@/app/[lang]/[...not-found]/page';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

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
    authRepository: new AuthNextAppRouteRepository(),
  });

  if (!storeId) {
    return <NotFound />;
  }

  const storeDetail = await storeService.getStoreDetail({
    storeUuid: storeId,
  });

  const storeDetails = storeDetail;

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
