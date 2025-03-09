'use client';

import type {
  ParentSavedListResponse,
  StoreDetailInfoData,
} from '@repo/entity/src/store';
import { StoreFeatureIconList } from '../../../../../map/@bottomSheet/_components/StoreFeatureIconList';
import { StoreInfo } from '../../../../../map/@bottomSheet/_components/StoreInfo';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';
import IconDownload from '@repo/design-system/components/icons/IconDownload';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { useCallback, useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CouponIsNotReadyModal } from '../../../../../map/_modals/CouponIsNotReadyModal';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { cn } from '@repo/ui/lib/utils';
import { getIconColor } from '../../../../../map/_utils/iconColor';
import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { NeedLoginModal } from '../../../_modals/NeedLoginModal';

interface DetailInfoContainerProps
  extends Omit<StoreDetailInfoData, 'communityReviews'> {
  parentlistInfo?: ParentSavedListResponse;
}
export function DetailInfoContainer({
  storeUuid,
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
  storeImages,
  ownerPickImages,
  latitude,
  longitude,
  holidays,
  notice,
  topPreferences,
  parentlistInfo,
  saved,
}: DetailInfoContainerProps) {
  const storeService = new StoreService({
    storeRepository: new StoreAPIRepository(),
  });

  const listColorId = parentlistInfo?.iconColorId;

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

  const hexagonGridProps = {
    contents: topPreferences,
    storeImages,
    ownerPickImages,
  };

  const router = useRouter();

  const { user } = useContext(UserContext);

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleBtnClick = async () => {
    push('modal', {
      component: <CouponIsNotReadyModal onClose={closeModal} />,
    });

    await storeService.updateCouponCount();
  };

  const handleIconFlowerClick = useCallback(() => {
    if (!user) {
      push('modal', {
        component: <NeedLoginModal onClose={closeModal} />,
      });
    } else {
      router.replace(`?saveStore=true`, {
        scroll: false,
      });
    }
  }, [router]);

  return (
    <div>
      <div className="flex justify-between items-center mb-[9px]">
        <div className="flex justify-start items-center">
          <span className="md:mr-[10.37px] font-semibold text-base md:text-t28">
            {name}
          </span>
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <span className="flex ml-[5.55px] md:ml-[13px] text-[10px] md:text-base">
            {tags.map((tag, index) => (
              <span
                className="font-medium text-[#6F6F6F] md:text-t20"
                key={tag}
              >
                {tag}
                {index < tags.length - 1 && ', '}&nbsp;
              </span>
            ))}
          </span>
        </div>
        {saved ? (
          <div className="mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm">
            <div className="w-4 md:w-[37.71px] h-4 md:h-[37.71px]">
              <IconFlower
                className={cn(
                  listColorId && getIconColor(listColorId),
                  'w-full h-full',
                )}
              />
            </div>
          </div>
        ) : (
          <button onClick={() => handleIconFlowerClick()}>
            <div className="mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm">
              <div className="w-4 md:w-[37.71px] h-4 md:h-[37.71px]">
                <IconFlowerOutline
                  className={cn('w-full h-full text-[#898989]')}
                />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="relative">
        <button
          onClick={async () => handleBtnClick()}
          className="text-start flex items-center border border-[#9F9F9F] rounded-[5px] md:rounded-[10px] w-full md:h-12 overflow-hidden"
        >
          <div className="bg-primary min-w-[10px] w-2 h-6 mr-1 md:w-4 md:h-full"></div>
          <div className="md:px-[10px] md:py-3 w-[calc(100%-95px)] md:w-[calc(100%-103px)] overflow-hidden text-[10px] md:text-[18px] md:text-nowrap">
            할인 / 이벤트 확인하기
          </div>
          <div className="flex justify-center items-center border-[#9F9F9F] border-l-[1px] border-dashed w-[87px] h-full">
            <div className="w-3 md:w-8 h-3 md:h-8">
              <IconDownload className="w-full h-full text-[#393939]" />
            </div>
          </div>
        </button>
        <div className="-top-[10px] right-[80px] z-10 absolute bg-white border-[#9F9F9F] border-l-[1px] rounded-full w-4 h-4 -rotate-90"></div>
        <div className="right-[80px] -bottom-[10px] z-10 absolute bg-white border-[#9F9F9F] border-l-[1px] rounded-full w-4 h-4 rotate-90"></div>
      </div>
      <div className="items-center grid grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr] md:mb-[37px]">
        <div>
          <div className="my-[10.93px] md:my-[26px]">
            <StoreInfo {...storeInfoProps} />
          </div>
          <div className="flex gap-[7.26px] md:gap-[17px]">
            <button className="px-[17.8px] md:px-10 md:py-[9px] border border-[#9F9F9F] rounded-[25.62px] md:rounded-[60px] md:min-w-[113px] h-fit text-[10px] md:text-xl text-nowrap">
              <a href={`tel:${phone}`}>전화</a>
            </button>
            <button className="px-[17.8px] md:px-10 md:py-[9px] border border-[#9F9F9F] rounded-[25.62px] md:rounded-[60px] md:min-w-[113px] h-fit text-[10px] md:text-xl text-nowrap">
              <a
                href={`https://map.kakao.com/link/to/${name},${latitude},${longitude}`}
              >
                길찾기
              </a>
            </button>
          </div>
        </div>
        <div>
          <HexagonGrid {...hexagonGridProps} />
        </div>
      </div>
      <div className="flex flex-col gap-[6px] md:gap-3">
        {notice.map((content) => (
          <div
            key={content}
            className="bg-[#F6F6F6] p-[6px] md:p-[13px] rounded-[4.27px] md:rounded-[10px] w-full text-[10px] md:text-base leading-3"
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
