'use client';

import { useState } from 'react';

import { BannerCarousel } from './_components/main/BannerCarousel';
import { BottomSheetContainer } from './_components/bottomsheet/BottomSheetContainer';
import { KakaoMap } from './_components/main/KakaoMap';

import { CATEGORIES, USER_PREFERENCES } from './_consts/tag';
import { useBottomSheet } from '../_hooks/useBottomSheet';
import { MapPanel } from './_components/main/MapPanel';
import { SideBarContainer } from './_components/sidebar/SidebarContainer';
import { useSideBar } from '../_hooks/useSidebar';
import { PreferenceTags } from './_components/main/PreferenceTags';
import { useMap } from '../_hooks/useMap';

export default function MapPage() {
  const [selectedStoreId, setSelectedStoreId] = useState<number>();

  const { isBottomSheetOpen, handleBottomSheetOpen, handleBottomSheetClose } =
    useBottomSheet();

  const { isSideBarOpen, handleSideBarOpen, handleSideBarClose } = useSideBar();

  const handleMakerClick = (storeId: number) => {
    setSelectedStoreId(storeId);
    handleBottomSheetOpen();
  };

  const {
    mapRef,
    errorMessage,
    apiUrl,
    loadMap,
    isTracking,
    stopTracking,
    startTracking,
    handleTrackingToggle,
  } = useMap(handleMakerClick);

  const kakaoMapProps = {
    mapRef,
    errorMessage,
    apiUrl,
    loadMap,
    stopTracking,
    startTracking,
  };

  const mapPanelProps = {
    handleSideBarOpen,
    handleTrackingToggle,
    isTracking,
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
