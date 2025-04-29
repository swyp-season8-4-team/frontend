import IconCar from '@repo/design-system/components/icons/IconCar2';
import IconDog from '@repo/design-system/components/icons/IconDog2';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler2';

export const FEATURES = [
  {
    icon: <IconCar className="h-full w-full text-[#E06A00]" />, // 아이콘 예시
    title: '주차 가능',
    id: 'parkingYn',
  },
  {
    icon: <IconDog className="h-full w-full" />,
    title: '반려 동반',
    id: 'animalYn',
  },
  {
    icon: <IconTumbler className="h-full w-full" />,
    title: '텀블러 할인',
    id: 'tumblerYn',
  },
];
