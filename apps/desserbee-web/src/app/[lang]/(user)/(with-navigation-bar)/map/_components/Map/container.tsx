'use client';

import dynamic from 'next/dynamic';
import { Map } from '.';
import { type PreferenceData } from '@repo/entity/src/store';
import { useState } from 'react';

const GoOwnerPageModal = dynamic(
  () => import('../../_modals/GoOwnerPageModal'),
  {
    ssr: false,
  },
);

interface MapContainerProps {
  preferenceCategories: PreferenceData[];
}
export function MapContainer({ preferenceCategories }: MapContainerProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const mapProps = {
    preferenceCategories,
    isMapLoaded,
    handleMapLoad: () => {
      setIsMapLoaded(true);
    },
  };
  return (
    <>
      <Map {...mapProps} />
      {isMapLoaded && <GoOwnerPageModal />}
    </>
  );
}
