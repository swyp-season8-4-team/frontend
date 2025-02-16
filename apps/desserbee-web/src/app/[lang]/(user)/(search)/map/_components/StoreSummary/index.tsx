import type { StoreSummaryData } from '@repo/entity/src/store';

import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import IconStar from '@repo/design-system/components/icons/IconStar';

import { StoreFeatureIconList } from '../StoreFeatureIconList';
import { IconSize } from '@repo/design-system/components/icons';
import Link from 'next/link';

type StoreSummaryProps = Omit<StoreSummaryData, 'storeImages'>;

export function StoreSummary({
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
}: StoreSummaryProps) {
  const storeFeatureIconListProps = {
    animalYn,
    tumblerYn,
    parkingYn,
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
      <div className="flex items-center gap-[6px]">
        <IconLocation size={IconSize.xs} className="text-[#BABABA]" />
        <span>{address}</span>
      </div>
      <div>
        <div className="flex items-center gap-[6px]">
          <IconClock size={IconSize.xs} className="text-[#BABABA]" />
          <span>{operatingHours}</span>
          {/* TODO: 영업중 [ ]에 영업종료로 변경 */}
        </div>
        <div className="flex items-center gap-[22px]">
          <span></span>
          <span>{closingDays}</span>
        </div>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconPhone size={IconSize.xs} className="text-[#BABABA]" />
        <span>{phone}</span>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconHome size={IconSize.xs} className="text-[#BABABA]" />
        <span>{parkingYn && '주차 가능'}예약</span>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconBaseball size={IconSize.xs} className="text-[#BABABA]" />
        <a className="underline" href={storeLink}>
          {storeLink}
        </a>
      </div>
    </div>
  );
}
