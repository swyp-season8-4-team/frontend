import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { DetailContainer } from './_components/(detail)/DetailContainer';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';
import { storeDetail } from '../../map/_consts/marker';

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

  const authService = new AuthService({
    authRepository: new AuthNextAppRouteRepository(),
  });

  if (!storeId) {
    return <NotFound />;
  }

  // const storeDetail = await storeService.getStoreDetail(storeId);
  const storeDetails = storeDetail;

  const authorization = await authService.getAuthorization();

  if (storeDetail.savedListId) {
    const parentListInfo = await storeService.getParentSavedList({
      listId: storeDetail.savedListId,
      authorization: authorization || null, //TODO: 로그인일시, 비로그인일시 둘다 접근 가능 BUT 로그인일 때만 리스트 어느리스트에 저장된지 확인위해..
    });

    // const parentListInfo = {
    //   listId: 121,
    //   listName: '맛집!@',
    //   iconColorId: 3,
    // };

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
