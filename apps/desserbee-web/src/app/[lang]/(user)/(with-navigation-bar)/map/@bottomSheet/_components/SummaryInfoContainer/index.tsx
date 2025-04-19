import type { StoreSummaryInfoData } from '@repo/entity/src/store';

import IconStar from '@repo/design-system/components/icons/IconStar';

import { StoreInfo } from '../StoreInfo';
import { StoreFeatureIconList } from '../StoreFeatureIconList';

type StoreSummaryProps = Omit<StoreSummaryInfoData, 'storeImages' | 'storeId'>;

import IconDetail from '@repo/design-system/components/icons/IconDetail';
import { useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { BeforeDetailJoinNowModal } from '../../../_modals/BeforeDetailJoinNowModal';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { NavigationPathGroup } from '@repo/entity/src/navigation';

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
  storeLinks,
  description,
  holidays,
}: StoreSummaryProps) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const storeFeatureIconListProps = {
    animalYn,
    tumblerYn,
    parkingYn,
  };

  const storeInfoProps = {
    address,
    operatingHours,
    phone,
    storeLinks,
    description,
    holidays,
  };

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleGoDetailBtnClick = () => {
    if (user) {
      router.push(`${NavigationPathGroup.Store + storeUuid}`);
    } else {
      push('modal', {
        component: (
          <BeforeDetailJoinNowModal
            storeUuid={storeUuid}
            onClose={closeModal}
          />
        ),
      });
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-[2px] flex justify-between md:mb-[9px]">
        <div className="flex items-center">
          <div className="mx-[3px] w-[10px] md:mx-2 md:w-[21px]">
            <IconStar className="h-full w-full text-[#FFB700]" />
          </div>
          <span className="mr-1 text-[10px] md:mr-2 md:text-xl">
            {averageRating}
          </span>
          <StoreFeatureIconList {...storeFeatureIconListProps} />
        </div>
        <button
          onClick={handleGoDetailBtnClick}
          className="max-h-fit text-nowrap rounded-[42.71px] bg-[#DE8332] px-[5.6px] font-semibold text-white md:rounded-[100px] md:px-5 md:py-[5px]"
        >
          <div className="flex items-center">
            <div className="mr-[0.57px] flex w-[10px] items-center justify-center md:w-[18.08px]">
              <IconDetail className="h-full w-full" />
            </div>
            <div className="text-[10px] md:text-lg">자세히 보기</div>
          </div>
        </button>
      </div>
      <div className="mb-[2px] flex flex-col items-start md:mb-[15px] md:flex-row md:items-center">
        <span className="md:text-t28 mr-[4.44px] text-xs font-semibold md:mr-[10.37px]">
          {name}
        </span>
        <span className="flex flex-wrap">
          {/* {tags.map((tag, index) => (
            <span
              className="font-medium text-[#6F6F6F] text-[10px] md:text-t20"
              key={tag}
            >
              {tag}
              {index < tags.length - 1 && ', '}&nbsp;
            </span>
          ))} */}
        </span>
      </div>
      <StoreInfo {...storeInfoProps} />
    </div>
  );
}
