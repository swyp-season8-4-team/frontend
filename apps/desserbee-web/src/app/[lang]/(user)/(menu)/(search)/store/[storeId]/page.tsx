import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { DetailContainer } from './_components/(detail)/DetailContainer';
import NotFound from '@/app/[lang]/[...not-found]/page';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
// import { storeDetail } from '../../map/_consts/marker';

interface StoreDetailPageProps {
  params: Promise<{
    storeId: string;
  }>;
}

export default async function StoreDetailPage({
  params,
}: StoreDetailPageProps) {
  // const headersList = await headers();
  // const userUuid = headersList.get('X-User-UUID');

  const storeId = (await params).storeId;

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const authService = new AuthService({
    authRepository: new AuthNextAppRouteRepository(),
  });

  const authorization = await authService.getAuthorization();

  if (!storeId) {
    return <NotFound />;
  }

  const storeDetail = await storeService.getStoreDetail({
    storeUuid: storeId,
    ...(authorization && { authorization }),
    // ...(userUuid && { userUuid }),
  });

  const storeDetails = storeDetail;

  if (storeDetail.savedListId) {
    const parentListInfo = await storeService.getParentSavedList({
      listId: storeDetail.savedListId,
      ...(authorization && { authorization }),
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
