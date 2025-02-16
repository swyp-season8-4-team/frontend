import type { StoreDetailInfoData } from '@repo/entity/src/store';
import { StoreFeatureIconList } from '../../common/StoreFeatureIconList';
import { StoreInfo } from '../../common/StoreInfo';
import { HexagonGrid } from '@repo/design-system/components/HexagonGrid';
import IconDownload from '@repo/design-system/components/icons/IconDownload';
import { IconSize } from '@repo/design-system/components/icons';
import IconFlower from '@repo/design-system/components/icons/IconFlower';

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
  };

  const hexagonGridProps = {
    contents,
    previewImages: storeImages,
  };

  const notices = [
    {
      id: 0,
      content:
        'No sugar, Low carb, Gluten free _ 초콜릿과 팥앙금 등 부재료 또한 하나부터 열까지 설탕 없이 직접 만듭니다.',
    },
    { id: 2, content: '인스타그램 @ketobbang 에서 소식을 확인해주세요.' },
  ]; // TODO: 아직 API에 공지 관련 없어서 임의로 만듬, 나중에 props로 받는 것으로 수정

  return (
    <div>
      <div className="flex justify-between items-center mb-[9px]">
        <div className="flex items-center">
          <span className="text-t28 font-semibold mr-[10.37px]">{name}</span>
          <StoreFeatureIconList {...storeFeatureIconListProps} />
          <span className="flex ml-[13px]">
            {tags.map((tag, index) => (
              <span className="text-[#6F6F6F] text-t20 font-medium" key={tag}>
                {tag}
                {index < tags.length - 1 && ', '}&nbsp;
              </span>
            ))}
          </span>
        </div>
        <div className="rounded-sm border-[0.5px] border-[#D5D5D5] mr-2">
          <IconFlower size={IconSize.xl} className="text-primary" />
        </div>
      </div>
      <div className="relative">
        <div className=" flex items-center w-full rounded-[10px] h-12 border border-[#9F9F9F] overflow-hidden">
          <div className="h-full w-4 bg-primary"></div>
          <div className="px-[10px] w-[calc(100%-103px)] py-3 text-nowrap text-[18px] overflow-hidden">
            할인 / 이벤트 확인하기
          </div>
          <button className="h-full border-l-[1px] border-dashed border-[#9F9F9F] w-[87px] flex justify-center items-center">
            <IconDownload size={IconSize.m} className="text-[#393939]" />
          </button>
        </div>
        <div className="absolute w-4 h-4 rounded-full border-l-[1px] border-[#9F9F9F] -top-[10px] right-[80px] bg-white -rotate-90 z-50"></div>
        <div className="absolute w-4 h-4 rounded-full border-l-[1px] border-[#9F9F9F] -bottom-[10px] right-[80px] bg-white rotate-90 z-50"></div>
      </div>

      <div className="flex justify-between items-start mb-7">
        <div>
          <div className="my-[26px]">
            <StoreInfo {...storeInfoProps} />
          </div>
          <div className="flex gap-[17px]">
            <button className="px-10 py-[9px] min-w-[113px] border rounded-[60px] border-[#9F9F9F]">
              <a href={`tel:${phone}`}>전화</a>
            </button>
            <button className="px-10 py-[9px] min-w-[113px] border rounded-[60px] border-[#9F9F9F]">
              <a
                href={`https://map.kakao.com/link/to/${name},37.499462,127.028274`}
              >
                길찾기
              </a>
            </button>
          </div>
        </div>
        <HexagonGrid {...hexagonGridProps} />
      </div>
      <div className="flex flex-col gap-3">
        {notices.map((notice) => (
          <div
            key={notice.id}
            className="p-[13px] w-full max-h-fit bg-[#F6F6F6] rounded-[10px]"
          >
            {notice.content}
          </div>
        ))}
      </div>
    </div>
  );
}
