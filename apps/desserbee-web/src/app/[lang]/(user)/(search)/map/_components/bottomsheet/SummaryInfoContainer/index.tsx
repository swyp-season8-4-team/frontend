import type { StoreSummaryInfoData } from '@repo/entity/src/store';

import IconStar from '@repo/design-system/components/icons/IconStar';

import { StoreInfo } from '../../common/StoreInfo';
import { StoreFeatureIconList } from '../../common/StoreFeatureIconList';

type StoreSummaryProps = Omit<StoreSummaryInfoData, 'storeImages' | 'storeId'>;

import IconDetail from '@repo/design-system/components/icons/IconDetail';
import { useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { BeforeDetailJoinNowModal } from '../../modal/BeforeDetailJoinNowModal';

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

  const { push, pop } = useContext(PortalContext);

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
    <div className="flex flex-col w-full text-nowrap">
      <div className="flex justify-between mb-[5.78px] md:mb-[9px]">
        <div className="flex items-center">
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <div className="mx-[3px] md:mx-2 w-[9px] md:w-[21px]">
            <IconStar className="w-full h-full text-[#FFB700]" />
          </div>
          <span className="text-[8px] md:text-xl">{averageRating}</span>
        </div>
        <button
          onClick={handleGoDetailBtnClick}
          className="bg-[#DE8332] px-[4.6px] md:px-5 md:py-[10px] rounded-[42.71px] md:rounded-[100px] max-h-fit font-semibold text-white"
        >
          <div className="flex items-center">
            <div className="flex justify-center items-center mr-[0.57px] w-[7.72px] md:w-[18.08px]">
              <IconDetail className="w-full h-full" />
            </div>
            <div className="text-[6px] md:text-lg">자세히 보기</div>
          </div>
        </button>
      </div>
      <div className="flex md:flex-row flex-col items-start md:items-center mb-[5.78px] md:mb-[15px]">
        <span className="mr-[4.44px] md:mr-[10.37px] font-semibold md:text-t28 text-xs">
          {name}
        </span>
        <span className="flex">
          {tags.map((tag, index) => (
            <span
              className="font-medium text-[#6F6F6F] text-[8px] md:text-t20"
              key={tag}
            >
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
