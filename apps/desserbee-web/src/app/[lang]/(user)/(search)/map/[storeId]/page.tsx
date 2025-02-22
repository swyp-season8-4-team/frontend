import { DetailContainer } from '../_components/detail/DetailContainer';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';

export default async function StoreDetailPage({
  params,
}: {
  params: { storeId: string; lang: string };
}) {
  const { storeId } = await params;

  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  const storeDetail = await storeService.getStoreDetail(storeId);

  return <DetailContainer storeDetail={storeDetail} />;
}
