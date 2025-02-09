'use client';

import { useState } from 'react';

import { BannerCarousel } from './_components/BannerCarousel';
import { BottomSheetContainer } from './_components/BottomSheetContainer';
import { KakaoMap } from './_components/KakaoMap';
import { PreferenceTags } from './_components/PreferenceTags';

import { CATEGORIES } from './_consts/tag';
import { useBottomSheet } from '../_hooks/useBottomSheet';

export default function MapPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<number>(1);

  const { isBottomSheetOpen, handleBottomSheetOpen, handleBottomSheetClose } =
    useBottomSheet();

  const kakaoMapProps = {
    handleMakerClick: (storeId: number) => {
      setSelectedStoreId(storeId);
      handleBottomSheetOpen();
    },
  };

  const bottomSheetProps = {
    storeId: selectedStoreId,
    isBottomSheetOpen,
    handleBottomSheetClose,
  };

  return (
    <div className="flex flex-col">
      <div className="px-base">
        <KakaoMap {...kakaoMapProps}>
          <PreferenceTags categories={CATEGORIES} />
        </KakaoMap>
        <BannerCarousel />
        {/* <Modal buttons={<Button>test</Button>} title="test" visible={true} /> */}
      </div>
      <BottomSheetContainer {...bottomSheetProps} />
    </div>
  );
}
