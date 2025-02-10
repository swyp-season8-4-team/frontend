import Image from 'next/image';
import dogIcon from '../../_assets/svg/icon-dog.svg';

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
  const storeFeaturesClass =
    'flex justify-center items-center w-7 h-7 bg-[#E8E8E8] rounded-full mr-[6px]';

  const featureList = [
    {
      key: 'animalYn',
      status: animalYn,
      src: dogIcon,
      alt: '동물 입장 가능',
    },
    {
      key: 'parkingYn',
      status: parkingYn,
      src: dogIcon, //TODO:아이콘인지 불분명
      alt: '주차 가능',
    },
    {
      key: 'tumblerYn',
      status: tumblerYn,
      src: dogIcon,
      alt: '텀블러 사용 가능', //TODO: 아이콘인지 불분명
    },
  ];

  return (
    <span className="flex">
      {featureList.map(
        (feature) =>
          feature.status && (
            <span key={feature.key} className={storeFeaturesClass}>
              <Image src={feature.src} alt={feature.alt} />
            </span>
          ),
      )}
    </span>
  );
}
