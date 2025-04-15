import { Map } from './_components/Map';
import { BannerCarousel } from './_components/BannerCarousel';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';
import { GoOwnerPageModal } from './_modals/GoOwnerPageModal';

export default async function MapPage() {
  const storeService = new StoreService({
    storeRepository: new StoreAPIReopository(),
  });

  let preferenceCategories;

  try {
    preferenceCategories = await storeService.getAllPreference();
  } catch (error) {
    console.log(error);

    return <NotFound />;
  }

  const mapProps = {
    preferenceCategories,
  };

  return (
    <div className="scroll-none relative h-full overflow-hidden">
      <GoOwnerPageModal />
      <Map {...mapProps} />
    </div>
  );
}
