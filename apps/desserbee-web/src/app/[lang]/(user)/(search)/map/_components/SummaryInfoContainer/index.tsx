import type { StoreSummaryData } from '@repo/entity/src/store';

import { StoreFeatureIconList } from '../StoreFeatureIconList';
import { StoreInfo } from '../StoreInfo.tsx';

import IconStar from '@repo/design-system/components/icons/IconStar';

import Link from 'next/link';

type StoreSummaryProps = Omit<StoreSummaryData, 'storeImages'>;

export function SummaryInfoContainer({
  id,
  name,
  animalYn,
  tumblerYn,
  parkingYn,
  averageRating,
  tags,
  address,
  operatingHours,
  closingDays,
  phone,
  storeLink,
  description,
}: StoreSummaryProps) {
  const storeFeatureIconListProps = {
    animalYn,
    tumblerYn,
    parkingYn,
  };

  const storeInfoProps = {
    address,
    operatingHours,
    closingDays,
    phone,
    storeLink,
    description,
  };

  return (
    <div className="flex flex-col gap-y-2 w-full text-nowrap">
      <div className="flex justify-between">
        <div className="flex items-center mb-[9px]">
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <IconStar className="text-[#FFB700] mx-2" />
          <span className="text-xl">{averageRating}</span>
        </div>
        <Link href={`/ko/map/${id}`}>
          <button className="rounded-[100px] bg-primary text-white text-lg font-semibold px-5 py-[10px]">
            가게 상세정보
          </button>
        </Link>
      </div>
      <div className="flex items-center mb-[15px]">
        <span className="text-t28 font-semibold mr-[10.37px]">{name}</span>
        <span className="flex ">
          {tags.map((tag, index) => (
            <span className="text-[#6F6F6F] text-t20 font-medium" key={tag}>
              {tag}
              {index < tags.length - 1 && ', '}&nbsp;
            </span>
          ))}
        </span>
      </div>
      <StoreInfo {...storeInfoProps} />
    </div>
  );
}
