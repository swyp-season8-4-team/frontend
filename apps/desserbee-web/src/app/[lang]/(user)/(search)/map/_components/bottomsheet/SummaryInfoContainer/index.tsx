import type { StoreSummaryInfoData } from '@repo/entity/src/store';

import IconStar from '@repo/design-system/components/icons/IconStar';
import IconDetail from '@repo/design-system/components/icons/IconDetail';

import { StoreInfo } from '../../common/StoreInfo';
import { BeforeDetailJoinNowModal } from '../../modal/BeforeDetailJoinNowModal';
import { StoreFeatureIconList } from '../../common/StoreFeatureIconList';

import { useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';

type StoreSummaryProps = Omit<StoreSummaryInfoData, 'storeImages' | 'storeId'>;

export function SummaryInfoContainer({
  storeUuid,
  name,
  animalYn,
  tumblerYn,
  parkingYn,
  averageRating,
  tags,
  address,
  operatingHours,
  phone,
  storeLink,
  description,
  holidays,
}: StoreSummaryProps) {
  const { push, pop } = useContext(PortalContext);

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
    holidays,
  };

  const closeModal = () => {
    pop('modal');
  };

  const handleGoDetailBtnClick = () => {
    push('modal', {
      component: (
        <BeforeDetailJoinNowModal storeUuid={storeUuid} onClose={closeModal} />
      ),
    });
  };

  return (
    <div className="flex flex-col gap-y-2 w-full text-nowrap">
      <div className="flex justify-between">
        <div className="flex items-center mb-[9px]">
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <IconStar className="mx-2 text-[#FFB700]" />
          <span className="text-xl">{averageRating}</span>
        </div>
        <button
          onClick={handleGoDetailBtnClick}
          className="bg-[#DE8332] px-5 py-[10px] rounded-[100px] min-w-fit font-semibold text-white text-lg"
        >
          <div className="flex items-center">
            <div>
              <IconDetail />
            </div>
            <div>자세히 보기</div>
          </div>
        </button>
      </div>
      <div className="flex items-center mb-[15px]">
        <span className="mr-[10.37px] font-semibold text-t28">{name}</span>
        <span className="flex">
          {tags.map((tag, index) => (
            <span className="font-medium text-[#6F6F6F] text-t20" key={tag}>
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
