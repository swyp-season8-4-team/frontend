import { DetailContainer } from '../_components/detail/DetailContainer';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export default async function StoreDetailPage({
  params,
}: {
  params: { storeId: string };
}) {
  const storeId = (await params).storeId;

  // console.log(storeUuid);

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const storeDetail = await storeService.getStoreDetail(storeId[0]);

  return <DetailContainer storeDetail={storeDetail} />;
}
