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

  const { isBottomSheetOpen, toggleBottomSheet } = useBottomSheet();

  const kakaoMapProps = {
    handleMakerClick: (storeId: number) => {
      setSelectedStoreId(storeId);
      toggleBottomSheet();
    },
  };

  const bottomSheetProps = {
    storeId: selectedStoreId,
    isBottomSheetOpen,
    toggleBottomSheet,
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
      <div className="flex items-center justify-start">
        <button onClick={toggleBottomSheet} className="rounded-xl bg-white p-4">
          open bottom sheet
        </button>
      </div>
      <BottomSheetContainer {...bottomSheetProps} />
    </div>
  );
}
