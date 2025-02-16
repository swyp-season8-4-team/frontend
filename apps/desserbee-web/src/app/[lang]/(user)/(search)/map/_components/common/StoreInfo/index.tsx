import IconLocation from '@repo/design-system/components/icons/IconLocation';
import IconClock from '@repo/design-system/components/icons/IconClock';
import IconPhone from '@repo/design-system/components/icons/IconPhone';
import IconHome from '@repo/design-system/components/icons/IconHome';
import IconBaseball from '@repo/design-system/components/icons/IconBaseball';
import type { StoreSummaryData } from '@repo/entity/src/store';
import { IconSize } from '@repo/design-system/components/icons';
type StoreInfoProps = Pick<
  StoreSummaryData,
  | 'address'
  | 'operatingHours'
  | 'closingDays'
  | 'phone'
  | 'storeLink'
  | 'description'
>;
export function StoreInfo({
  address,
  operatingHours,
  closingDays,
  phone,
  storeLink,
  description,
}: StoreInfoProps) {
  return (
    <div className="flex flex-col gap-y-2 w-full text-nowrap">
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
        <span>{description}</span>
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
