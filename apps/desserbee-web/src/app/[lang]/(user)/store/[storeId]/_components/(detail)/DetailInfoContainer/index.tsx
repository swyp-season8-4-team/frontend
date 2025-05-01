'use client';

import type {
  ParentSavedListResponse,
  StoreDetailInfoData,
} from '@repo/entity/src/store';
import { StoreFeatureIconList } from '../../../../../(with-navigation-bar)/map/@bottomSheet/_components/StoreFeatureIconList';
import { StoreInfo } from '../../../../../(with-navigation-bar)/map/@bottomSheet/_components/StoreInfo';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';
import IconDownload from '@repo/design-system/components/icons/IconDownload';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { useCallback, useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CouponIsNotReadyModal } from '../../../../../(with-navigation-bar)/map/_modals/CouponIsNotReadyModal';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import { cn } from '@repo/ui/lib/utils';
import { getIconColor } from '../../../../../(with-navigation-bar)/map/_utils/iconColor';
import IconFlowerOutline from '@repo/design-system/components/icons/IconFlowerOutline';
import { UserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { NeedLoginModal } from '../../../_modals/NeedLoginModal';
import { commonErrorHandler } from '@/error/commonErrorHandler';

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
  storeLinks,
  description,
  storeImages,
  ownerPickImages,
  latitude,
  longitude,
  holidays,
  notices,
  primaryStoreLink,
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
    storeLinks,
    description,
    holidays,
  };

  const hexagonGridProps = {
    contents: topPreferences
      .sort((a, b) => a.rank - b.rank)
      .map((pref) => pref.name),
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

    await commonErrorHandler(storeService.updateCouponCount(), {
      router,
    });
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
      <div className="mb-[9px] flex items-center justify-between">
        <div className="flex items-center justify-start">
          <span className="md:text-t28 text-base font-semibold md:mr-[10.37px]">
            {name}
          </span>
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <span className="ml-[5.55px] flex text-[10px] md:ml-[13px] md:text-base">
            {tags.map(({ category, id, name }, index) => (
              <span className="md:text-t20 font-medium text-[#6F6F6F]" key={id}>
                {name}
                {index < tags.length - 1 && ', '}&nbsp;
              </span>
            ))}
          </span>
        </div>
        {saved ? (
          <div className="mr-2 rounded-sm border-[0.5px] border-[#D5D5D5]">
            <div className="h-4 w-4 md:h-[37.71px] md:w-[37.71px]">
              <IconFlower
                className={cn(
                  listColorId && getIconColor(listColorId),
                  'h-full w-full',
                )}
              />
            </div>
          </div>
        ) : (
          <button onClick={() => handleIconFlowerClick()}>
            <div className="mr-2 rounded-sm border-[0.5px] border-[#D5D5D5]">
              <div className="h-4 w-4 md:h-[37.71px] md:w-[37.71px]">
                <IconFlowerOutline
                  className={cn('h-full w-full text-[#898989]')}
                />
              </div>
            </div>
          </button>
        )}
      </div>
      <div className="relative">
        <button
          onClick={async () => handleBtnClick()}
          className="flex w-full items-center overflow-hidden rounded-[5px] border border-[#9F9F9F] text-start md:h-12 md:rounded-[10px]"
        >
          <div className="bg-primary mr-1 h-6 w-2 min-w-[10px] md:h-full md:w-4"></div>
          <div className="w-[calc(100%-95px)] overflow-hidden text-[10px] md:w-[calc(100%-103px)] md:text-nowrap md:px-[10px] md:py-3 md:text-[18px]">
            할인 / 이벤트 확인하기
          </div>
          <div className="flex h-full w-[87px] items-center justify-center border-l-[1px] border-dashed border-[#9F9F9F]">
            <div className="h-3 w-3 md:h-8 md:w-8">
              <IconDownload className="h-full w-full text-[#393939]" />
            </div>
          </div>
        </button>
        <div className="absolute -top-[10px] right-[80px] z-10 h-4 w-4 -rotate-90 rounded-full border-l-[1px] border-[#9F9F9F] bg-white"></div>
        <div className="absolute -bottom-[10px] right-[80px] z-10 h-4 w-4 rotate-90 rounded-full border-l-[1px] border-[#9F9F9F] bg-white"></div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] items-center md:mb-[37px] md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-[10.93px] md:my-[26px]">
            <StoreInfo {...storeInfoProps} />
          </div>
          <div className="flex gap-[7.26px] md:gap-[17px]">
            <button className="h-fit text-nowrap rounded-[25.62px] border border-[#9F9F9F] px-[17.8px] text-[10px] md:min-w-[113px] md:rounded-[60px] md:px-10 md:py-[9px] md:text-xl">
              <a href={`tel:${phone}`}>전화</a>
            </button>
            <button className="h-fit text-nowrap rounded-[25.62px] border border-[#9F9F9F] px-[17.8px] text-[10px] md:min-w-[113px] md:rounded-[60px] md:px-10 md:py-[9px] md:text-xl">
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
        {notices.map(
          ({ content, title, createdAt, noticeId, tag, updatedAt }, index) => (
            <div
              key={`${noticeId} - ${index}`}
              className="w-full rounded-[4.27px] bg-[#F6F6F6] p-[6px] text-[10px] leading-3 md:rounded-[10px] md:p-[13px] md:text-base"
            >
              {title}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
