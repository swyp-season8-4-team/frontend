'use client';
import IconCar from '@repo/design-system/components/icons/IconCar';
import IconDog from '@repo/design-system/components/icons/IconDog';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler';
import { useEffect, useMemo, useState, useRef } from 'react';

interface StoreFeatureIconListProps {
  animalYn: boolean;
  parkingYn: boolean;
  tumblerYn: boolean;
}

const createFeatureList = (
  parkingYn: boolean,
  tumblerYn: boolean,
  animalYn: boolean,
) => [
  {
    key: 'parkingYn',
    status: parkingYn,
    icon: <IconCar className="w-full h-full text-[#FF6535]" />,
    tooltip: '주차 가능 합니다!',
  },
  {
    key: 'tumblerYn',
    status: tumblerYn,
    icon: <IconTumbler className="w-full h-full text-[#FF6535]" />,
    tooltip: '텀블러 할인 가능합니다!',
  },
  {
    key: 'animalYn',
    status: animalYn,
    icon: <IconDog className="w-full h-full text-[#FF6535]" />,
    tooltip: '반려동물 출입 가능합니다!',
  },
];

export function StoreFeatureIconList({
  animalYn,
  parkingYn,
  tumblerYn,
}: StoreFeatureIconListProps) {
  const [selectedIconIndex, setSelectedIconIndex] = useState<number | null>(
    null,
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIconClick = (index: number) => {
    setSelectedIconIndex(selectedIconIndex === index ? null : index);
  };

  useEffect(() => {
    if (selectedIconIndex !== null) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setSelectedIconIndex(null);
      }, 1500);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [selectedIconIndex]);

  const featureList = useMemo(
    () => createFeatureList(parkingYn, tumblerYn, animalYn),
    [parkingYn, tumblerYn, animalYn],
  );

  return (
    <span className="flex items-start">
      {featureList.map(
        (feature, index) =>
          feature.status && (
            <div className="relative ml-1" key={feature.key}>
              <div
                className="w-[17.94px] md:w-[42px]"
                onPointerDown={() => handleIconClick(index)}
              >
                {feature.icon}
              </div>
              {selectedIconIndex === index && (
                <div className="top-[22px] md:top-12 before:top-[-2px] md:before:top-[-5px] left-1/2 before:left-1/2 z-10 absolute before:absolute bg-[#E8E8E8] px-[6px] py-[5px] md:px-[10px] md:py-1 before:border-r-[3px] md:before:border-r-[6px] before:border-r-transparent before:border-b-[3px] md:before:border-b-[6px] before:border-b-[#E8E8E8] before:border-l-[3px] md:before:border-l-[6px] before:border-l-transparent rounded-[1.65px] md:rounded-[5px] text-[4px] md:text-sm text-nowrap before:content-[''] -translate-x-1/2 before:-translate-x-1/2 h-[5px] md:h-auto leading-[5px] md:leading-normal flex items-center justify-center">
                  {feature.tooltip}
                </div>
              )}
            </div>
          ),
      )}
    </span>
  );
}
