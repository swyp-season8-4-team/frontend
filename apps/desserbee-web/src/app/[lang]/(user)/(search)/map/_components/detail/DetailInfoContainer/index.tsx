import type { StoreSummaryInfoData } from '@repo/entity/src/store';
import { StoreFeatureIconList } from '../../common/StoreFeatureIconList';
import { StoreInfo } from '../../common/StoreInfo';

type StoreSummaryProps = Omit<StoreSummaryInfoData, 'storeImages'>;

export function DetailInfoContainer({
  name,
  animalYn,
  tumblerYn,
  parkingYn,
  tags,
  address,
  operatingHours,
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
    phone,
    storeLink,
    description,
  };

  return (
    <div className="flex flex-col gap-y-2 w-full text-nowrap">
      <div className="flex justify-between">
        <div className="flex items-center mb-[9px]">
          <StoreFeatureIconList {...storeFeatureIconListProps} />
        </div>
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
