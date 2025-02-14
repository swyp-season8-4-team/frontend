'use client';

import { useState } from 'react';

import { BannerCarousel } from './_components/BannerCarousel';
import { BottomSheetContainer } from './_components/BottomSheetContainer';
import { KakaoMap } from './_components/KakaoMap';
import { PreferenceTags } from './_components/PreferenceTags';

import { CATEGORIES, USER_PREFERENCES } from './_consts/tag';
import { useBottomSheet } from '../_hooks/useBottomSheet';
import { MapPanel } from './_components/MapPanel';
import { SideBarContainer } from './_components/SidebarContainer';
import { useSideBar } from '../_hooks/useSidebar';

export default function MapPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<number>();

  const { isBottomSheetOpen, handleBottomSheetOpen, handleBottomSheetClose } =
    useBottomSheet();

  const { isSideBarOpen, handleSideBarOpen, handleSideBarClose } = useSideBar();

  const kakaoMapProps = {
    handleMakerClick: (storeId: number) => {
      setSelectedStoreId(storeId);
      handleBottomSheetOpen();
    },
  };

  const mapPanelProps = {
    handleSideBarOpen,
  };

  const bottomSheetProps = {
    storeId: selectedStoreId as number,
    isBottomSheetOpen,
    handleBottomSheetClose,
  };

  const sideBarProps = {
    isSideBarOpen,
    handleSideBarClose,
  };

  return (
    <div className="overflow-hidden">
      <div className="px-base h-full">
        <KakaoMap {...kakaoMapProps}>
          <PreferenceTags
            userPreferences={USER_PREFERENCES}
            categories={CATEGORIES}
          />
          <MapPanel {...mapPanelProps} />
          <SideBarContainer {...sideBarProps} />
        </KakaoMap>
        <BannerCarousel />
        {/* <Modal buttons={<Button>test</Button>} title="test" visible={true} /> */}
        <BottomSheetContainer {...bottomSheetProps} />
      </div>
    </div>
  );
}
