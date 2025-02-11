import Image from 'next/image';
// import dogIcon from '../../_assets/svg/icon-dog.svg';
import IconCar from '@repo/design-system/components/icons/IconCar';
import IconDog from '@repo/design-system/components/icons/IconDog';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler';
import { IconSize } from '@repo/design-system/components/icons';

interface StoreFeatureIconListProps {
  animalYn: boolean;
  parkingYn: boolean;
  tumblerYn: boolean;
}

export function StoreFeatureIconList({
  animalYn,
  parkingYn,
  tumblerYn,
}: StoreFeatureIconListProps) {
  const featureList = [
    {
      key: 'parkingYn',
      status: parkingYn,
      icon: <IconCar size={IconSize.l} className="text-[#FF6535]" />,
    },
    {
      key: 'animalYn',
      status: animalYn,
      icon: <IconDog size={IconSize.l} />,
    },
    {
      key: 'tumblerYn',
      status: tumblerYn,
      icon: <IconTumbler size={IconSize.l} />,
    },
  ];

  return (
    <span className="flex">
      {featureList.map(
        (feature) =>
          feature.status && (
            <div key={feature.key} className="ml-1">
              {feature.icon}
            </div>
          ),
      )}
    </span>
  );
}
