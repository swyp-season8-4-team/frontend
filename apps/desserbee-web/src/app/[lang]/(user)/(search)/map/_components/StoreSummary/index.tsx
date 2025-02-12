import type { StoreSummaryData } from '@repo/entity/src/store';

import IconPin from '@repo/design-system/components/icons/IconPin';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import IconStar from '@repo/design-system/components/icons/IconStar';

import { StoreFeatureIconList } from '../StoreFeatureIconList';
import { IconSize } from '@repo/design-system/components/icons';

type StoreSummaryProps = Omit<StoreSummaryData, 'id' | 'storeImages'>;

export function StoreSummary({
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
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center mb-[31px]">
        <StoreFeatureIconList {...storeFeatureIconListProps} />
        <IconStar className="text-[#FFB700] mx-2" />
        <span className="text-xl">{averageRating}</span>
      </div>
      <div className="flex items-center mb-[18px]">
        <span className="text-t28 font-semibold mr-[10.37px]">{name}</span>
        <span className="flex">
          {tags.map((tag, index) => (
            <span className="text-[#6F6F6F] text-t20 font-medium" key={tag}>
              {tag}
              {index < tags.length - 1 && ', '}&nbsp;
            </span>
          ))}
        </span>
      </div>
      <div className="flex items-center gap-[6px]">
        <IconPin size={IconSize.xs} className="text-[#BABABA]" />
        <span>{address}</span>
      </div>
      <div>
        <div className="flex items-center gap-[6px]">
          <IconClock size={IconSize.xs} className="text-[#BABABA]" />
          <span>{operatingHours}</span>{' '}
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
