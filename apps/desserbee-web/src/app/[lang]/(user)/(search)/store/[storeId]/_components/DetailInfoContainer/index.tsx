'use client';

import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { StoreFeatureIconList } from '../../../../map/@bottomSheet/_components/StoreFeatureIconList';
import { StoreInfo } from '../../../../map/@bottomSheet/_components/StoreInfo';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';
import IconDownload from '@repo/design-system/components/icons/IconDownload';
import IconFlower from '@repo/design-system/components/icons/IconFlower';
import { useContext } from 'react';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { CouponIsNotReadyModal } from '../../../../map/_modals/CouponIsNotReadyModal';

interface DetailInfoContainerProps extends StoreDetailInfoData {
  contents: string[];
}

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
  contents,
  storeImages,
  ownerPickImages,
  latitude,
  longitude,
  holidays,
  notice,

  // TODO: 가게 위도, 경도 받아와야함 (길찾기)
}: DetailInfoContainerProps) {
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
    contents,
    previewImages: storeImages,
    ownerPickImages,
  };

  const { push, pop } = useContext(PortalContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleBtnClick = () => {
    push('modal', {
      component: <CouponIsNotReadyModal onClose={closeModal} />,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-[9px] text-nowrap">
        <div className="flex justify-start items-center">
          <span className="md:mr-[10.37px] font-semibold text-3 md:text-t28">
            {name}
          </span>
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <span className="flex ml-[5.55px] md:ml-[13px] text-[8px] md:text-base">
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
        <div className="mr-2 border-[#D5D5D5] border-[0.5px] rounded-sm">
          <div className="w-4 md:w-[37.71px] h-4 md:h-[37.71px]">
            <IconFlower className="w-full h-full text-primary" />
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex items-center border border-[#9F9F9F] rounded-[10px] w-full md:h-12 overflow-hidden">
          <div className="bg-primary w-[7px] md:w-4 md:h-full"></div>
          <div className="md:px-[10px] md:py-3 w-[calc(100%-95px)] md:w-[calc(100%-103px)] overflow-hidden text-[8px] md:text-[18px] md:text-nowrap">
            할인 / 이벤트 확인하기
          </div>
          <button
            onClick={handleBtnClick}
            className="flex justify-center items-center border-[#9F9F9F] border-l-[1px] border-dashed w-[87px] h-full"
          >
            <div className="w-3 md:w-8 h-3 md:h-8">
              <IconDownload className="w-full h-full text-[#393939]" />
            </div>
          </button>
        </div>
        <div className="-top-[10px] right-[80px] z-50 absolute bg-white border-[#9F9F9F] border-l-[1px] rounded-full w-4 h-4 -rotate-90"></div>
        <div className="right-[80px] -bottom-[10px] z-50 absolute bg-white border-[#9F9F9F] border-l-[1px] rounded-full w-4 h-4 rotate-90"></div>
      </div>
      <div className="grid grid-cols-[2fr_1fr] md:grid-cols-[2fr_1fr] md:mb-[37px]">
        <div>
          <div className="my-[10.93px] md:my-[26px]">
            <StoreInfo {...storeInfoProps} />
          </div>
          <div className="flex gap-[7.26px] md:gap-[17px]">
            <button className="px-[17.8px] md:px-10 md:py-[9px] border border-[#9F9F9F] rounded-[25.62px] md:rounded-[60px] md:min-w-[113px] h-fit text-[8px] md:text-xl text-nowrap">
              <a href={`tel:${phone}`}>전화</a>
            </button>
            <button className="px-[17.8px] md:px-10 md:py-[9px] border border-[#9F9F9F] rounded-[25.62px] md:rounded-[60px] md:min-w-[113px] h-fit text-[8px] md:text-xl text-nowrap">
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
            className="bg-[#F6F6F6] p-[6px] md:p-[13px] rounded-[4.27px] md:rounded-[10px] w-full text-[8px] md:text-base leading-3"
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
}
