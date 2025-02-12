import IconCar from '@repo/design-system/components/icons/IconCar';
import IconDog from '@repo/design-system/components/icons/IconDog';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler';
import { IconSize } from '@repo/design-system/components/icons';
import { memo, useEffect, useMemo, useState } from 'react';

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
    icon: <IconCar size={IconSize.l} className="text-[#FF6535]" />,
    tooltip: '주차 가능 합니다!',
  },
  {
    key: 'tumblerYn',
    status: tumblerYn,
    icon: <IconTumbler size={IconSize.l} />,
    tooltip: '텀블러 할인 가능합니다!',
  },
  {
    key: 'animalYn',
    status: animalYn,
    icon: <IconDog size={IconSize.l} />,
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
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleIconClick = (index: number) => {
    setSelectedIconIndex(selectedIconIndex === index ? null : index);
  };

  useEffect(() => {
    if (selectedIconIndex !== null) {
      setTimeoutId(
        setTimeout(() => {
          setSelectedIconIndex(null);
        }, 1500),
      );
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        setTimeoutId(null);
      }
    };
  }, [selectedIconIndex]);

  const featureList = useMemo(
    () => createFeatureList(parkingYn, tumblerYn, animalYn),
    [parkingYn, tumblerYn, animalYn],
  );

  return (
    <span className="flex">
      {featureList.map(
        (feature, index) =>
          feature.status && (
            <div className="relative ml-1" key={feature.key}>
              <div onPointerDown={() => handleIconClick(index)}>
                {feature.icon}
              </div>
              {selectedIconIndex === index && (
                <div className="absolute text-sm text-nowrap rounded-[5px] top-10 left-1/2 -translate-x-1/2  bg-[#E8E8E8]  px-[10px] py-1 before:content-[''] before:absolute before:top-[-6px] before:left-1/2 before:-translate-x-1/2 before:border-l-[6px] before:border-l-transparent before:border-r-[6px] before:border-r-transparent before:border-b-[6px] before:border-b-[#E8E8E8]">
                  {feature.tooltip}
                </div>
              )}
            </div>
          ),
      )}
    </span>
  );
}
