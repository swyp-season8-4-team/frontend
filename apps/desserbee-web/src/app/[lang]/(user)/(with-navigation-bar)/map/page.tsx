export const revalidate = 60;

import { Map } from './_components/Map';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';
import { commonErrorHandler } from '@/error/commonErrorHandler';
import { GoOwnerModalContainer } from './_modals/GoOwnerPageModal/container';

export default async function MapPage() {
  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  let preferenceCategories;

  try {
    preferenceCategories = await commonErrorHandler(
      storeService.getAllPreference(),
    );
  } catch (error) {
    console.log(error);

    return <NotFound />;
  }

  const mapProps = {
    preferenceCategories,
  };

  return (
    <div className="scroll-none relative h-full overflow-hidden">
      <GoOwnerModalContainer />
      <Map {...mapProps} />
    </div>
  );
}
