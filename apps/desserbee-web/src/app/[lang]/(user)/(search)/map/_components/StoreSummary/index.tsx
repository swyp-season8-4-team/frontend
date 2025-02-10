import type { StoreSummaryData } from '@repo/entity/src/store';

import IconPin from '@repo/design-system/components/icons/IconPin';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import { StoreFeatureIconList } from '../StoreFeatureIconList';
import { IconSize } from '@repo/design-system/components/icons';

type StoreSummaryProps = Omit<
  StoreSummaryData,
  'id' | 'averageRating' | 'storeImages'
>;

export function StoreSummary({
  name,
  animalYn,
  tumblerYn,
  parkingYn,
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
      <div className="flex items-center mb-[18px]">
        <span className="text-t28 font-semibold mr-[10.37px]">{name}</span>
        <StoreFeatureIconList {...storeFeatureIconListProps} />
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
        <IconPin size={IconSize.xs} className="text-[#D2D2D2]" />
        <div>{address}</div>
      </div>
      <div>
        <div className="flex items-center gap-[6px]">
          <IconClock size={IconSize.xs} className="text-[#D2D2D2]" />
          <div>{operatingHours}</div> {/* TODO: 영업중 [ ]에 영업종료로 변경 */}
        </div>
        <div className="flex items-center gap-[22px]">
          <div></div>
          <div>{closingDays}</div>
        </div>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconPhone size={IconSize.xs} className="text-[#D2D2D2]" />
        <span>{phone}</span>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconHome size={IconSize.xs} className="text-[#D2D2D2]" />
        <span>{parkingYn && '주차 가능'}예약</span>
      </div>
      <div className="flex items-center  gap-[6px]">
        <IconBaseball size={IconSize.xs} className="text-[#D2D2D2]" />
        <a className="underline" href={storeLink}>
          {storeLink}
        </a>
      </div>
    </div>
  );
}
