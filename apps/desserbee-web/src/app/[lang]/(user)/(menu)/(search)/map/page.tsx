import { Map } from './_components/Map';
import { BannerCarousel } from './_components/BannerCarousel';

import StoreService from '@repo/usecase/src/storeService';
import StoreAPIReopository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import NotFound from '@/app/[lang]/[...not-found]/page';

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
    <div className="scroll-none h-full overflow-hidden">
      <div className="px-base h-full">
        <Map {...mapProps} />
        <BannerCarousel />
      </div>
    </div>
  );
}
