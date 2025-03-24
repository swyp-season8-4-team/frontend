'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { OperatingHoursItem, Tag } from '@repo/entity/src/store';
import Image from 'next/image';
import IconPicture from '@repo/design-system/components/icons/IconPicture2';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import IconCar from '@repo/design-system/components/icons/IconCar2';
import IconDog from '@repo/design-system/components/icons/IconDog2';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler2';
import { cn } from '@repo/ui/lib/utils';

const TAG_MOCK_DATA: Tag[] = [
  { parentTagName: '베이커리', tagName: '베이글', tagId: 0 },
  { parentTagName: '디저트', tagName: '케이크', tagId: 12 },
  { parentTagName: '스페셜', tagName: '파르페', tagId: 3 },
  { parentTagName: '스페셜', tagName: '파르페', tagId: 6 },
  { parentTagName: '스페셜', tagName: '파르페', tagId: 2 },
  { parentTagName: '스페셜', tagName: '파르페', tagId: 1 },
  { parentTagName: '스페셜', tagName: '파르페', tagId: 4 },
];

// TODO: 선택되었을 때 스타일도 필요
const FEATURES = [
  {
    icon: <IconCar className="h-full w-full text-[#E06A00]" />,
    title: '주차 가능',
    id: 'parkingYn',
  },
  {
    icon: <IconDog className="h-full w-full" />,
    title: '반려동물 동반',
    id: 'animalYn',
  },
  {
    icon: <IconTumbler className="h-full w-full" />,
    title: '텀블러 할인',
    id: 'tumblerYn',
  },
];

export default function RegisterBasicInfoPage() {
  const {
    setIsFormDirty,
    updateBasicInfo,
    updateTags,
    updateOperatingHours,
    updateFeatures,
    updateStoreImages,
    updateOwnerPickImages,
    completeStep,
    goToNextStep,
    storeData,
  } = useRegister();
  const router = useRouter();

  const [name, setName] = useState(storeData.name);
  const [phone, setPhone] = useState(storeData.phone);
  const [address, setAddress] = useState(storeData.address);
  const [detailAddress, setDetailAddress] = useState('');
  const [storeLink, setStoreLink] = useState(storeData.storeLink);
  const [description, setDescription] = useState(storeData.description);

  const [tags, setTags] = useState<Tag[]>(TAG_MOCK_DATA || []); // TODO: 태그 관련 물어봐야함 (추후 목데이터 수정하기)
  const [operatingHours, setOperationHours] = useState<OperatingHoursItem[]>(
    storeData.operatingHours || [],
  );

  const [features, setFeatures] = useState({
    animalYn: storeData.animalYn || false,
    tumblerYn: storeData.tumblerYn || false,
    parkingYn: storeData.parkingYn || false,
  });

  const [storeImageFiles, setStoreImageFiles] = useState(
    storeData.storeImageFiles || [],
  );
  const [ownerPickImageFiles, setOwnerPickImageFiles] = useState(
    storeData.ownerPickImageFiles || [],
  );

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const openAddressModal = () => {};

  const closeAddressModal = (address: string) => {
    setAddress(address);
  };

  // const handleAddressChange = (address: string) => {
  //   setAddress(address);
  // };

  const handleDetailAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDetailAddress(e.target.value);
  };

  const openOperatingHoursModal = () => {};

  const closeOperatingHoursModal = (operationHours: OperatingHoursItem[]) => {
    setOperationHours(operationHours);
  };
  // const handleOperationHoursChange = (operationHours: OperatingHoursItem[]) => {
  //   setOperationHours(operationHours);
  // };

  const openTagModal = () => {};

  const closeTagModal = (tags: Tag[]) => {
    setTags(tags);
  };

  const handleStoreLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreLink(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStoreImageFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setStoreImageFiles((prev) => [...prev, ...fileArray]);
    }
  };

  const handleRemoveStoreImageFiles = (index: number) => {
    setStoreImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFeatures((prev) => ({
      ...prev,
      [featureId]: !prev[featureId as keyof typeof prev],
    }));
  };

  // 다음 단계로 이동 및 context 업데이트
  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();

    completeStep(RegisterStep.BASIC_INFO);
    goToNextStep();

    const { latitude, longitude } = { latitude: 0, longitude: 0 };
    updateBasicInfo({
      name,
      phone,
      address,
      latitude,
      longitude,
      storeLink,
      description,
    });

    //updateTags(tags); //TODO: 태그 관련 고쳐야함.. 데이터 스키마 이거 아닐듯 (Tag에서 tagId만 뽑아서 배열 만들어 보내기)
    updateOperatingHours(operatingHours);
    updateStoreImages(storeImageFiles);
    updateOwnerPickImages(ownerPickImageFiles);
    updateFeatures(features);

    router.push(`${NavigationPathname.OwnerRegisterMenu}`);
  };

  // 컴포넌트 마운트 시 초기화
  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 정리 작업 (선택 사항)
    };
  }, []);

  return (
    <form
      onSubmit={handleNextStep}
      onChange={handleInputChange}
      className="mx-auto flex flex-col gap-y-[30px] p-4"
    >
      {/* 가게명 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex items-center gap-1">
          <div className="text-sm font-medium">가게명</div>
          <div className="text-xs">(필수)</div>
        </label>
        <input
          className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="가게 이름을 입력해주세요"
          required
        />
      </div>

      {/* 가게사진 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="storeImages" className="flex items-center gap-1">
          <div className="text-sm font-medium">가게 사진</div>
          <div className="text-xs">(선택)</div>
        </label>
        <div className="flex flex-col gap-2">
          <input
            className="hidden"
            type="file"
            id="storeImages"
            onChange={handleStoreImageFilesChange}
            accept="image/*"
            multiple
          />
          <div className="flex flex-wrap gap-2">
            <label
              className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
              htmlFor="storeImages"
            >
              <div className="h-7 w-7">
                <IconPicture className="h-full w-full text-[#545454]" />
              </div>
            </label>
            {storeImageFiles.length > 0 &&
              storeImageFiles.map((image, index) => (
                <div key={index} className="relative">
                  <div className="h-[68px] w-[68px] overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1]">
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(image)}
                      alt={`가게 사진 ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                    onClick={() => handleRemoveStoreImageFiles(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            {storeImageFiles.length < 4 &&
              Array.from({ length: 3 - storeImageFiles.length }).map(
                (_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
                  />
                ),
              )}
          </div>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="flex items-center gap-1">
          <div className="text-sm font-medium">전화번호</div>
          <div className="text-xs">(필수)</div>
        </label>
        <input
          className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm"
          type="text"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
      </div>

      {/* 주소 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="flex items-center gap-1">
          <div className="text-sm font-medium">주소</div>
          <div className="text-xs">(필수)</div>
        </label>
        <div className="relative">
          <button
            onClick={openAddressModal}
            type="button"
            className="absolute right-[10px] top-[50%] -translate-y-1/2"
          >
            <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
          </button>
          <input
            className="w-full rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] text-sm"
            type="text"
            id="address"
            value={address}
            placeholder="주소를 입력해주세요"
            // onChange={handleAddressChange}
            disabled
          />
        </div>
        <input
          className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
          type="text"
          id="address"
          value={detailAddress}
          placeholder="상세주소 (예.2층)"
          onChange={handleDetailAddressChange}
          required
        />
      </div>

      {/* 운영시간 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="operatingHours" className="flex items-center gap-1">
          <div className="text-sm font-medium">운영시간</div>
          <div className="text-xs">(필수)</div>
        </label>
        <div className="relative">
          <button
            onClick={openOperatingHoursModal}
            type="button"
            className="absolute right-[10px] top-[50%] -translate-y-1/2"
          >
            <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
          </button>
          <input
            className="w-full rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] text-sm"
            type="text"
            id="operatingHours"
            // value={operatingHours} // TODO: 운영시간 선택, 입력 완료하면 어떻게보여야하는거지?
            placeholder="운영시간을 입력해주세요"
            disabled
          />
        </div>
      </div>

      {/* 특성 태그 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <div className="text-sm font-medium">특성 태그</div>
            <div className="text-xs">(필수)</div>
          </div>
          <div className="text-xs text-[#424242]">최대 3개 선택</div>
        </label>
        {tags.length > 0 ? (
          <div className="relative">
            <button
              onClick={openTagModal}
              type="button"
              className="absolute right-[10px] top-5 -translate-y-1/2"
            >
              <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
            </button>
            <div
              className="flex w-full flex-wrap gap-1 rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] pr-8 text-sm"
              id="tags"
            >
              {tags.map(({ parentTagName, tagName, tagId }) => (
                <div
                  key={tagId}
                  className="rounded-[3px] border-[0.3px] border-[#9F9F9F] bg-white px-2 py-1 text-xs text-[#393939]"
                >
                  {parentTagName}&nbsp;{'>'}&nbsp;{tagName}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={openAddressModal}
              type="button"
              className="absolute right-[10px] top-[50%] -translate-y-1/2"
            >
              <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
            </button>
            <input
              className="w-full rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] text-sm"
              type="text"
              id="tags"
              placeholder="가게 태그를 선택해주세요"
              disabled
            />
          </div>
        )}
      </div>

      {/* 한 줄 소개 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-sm font-medium">한 줄 소개</div>
            <div className="text-xs">(선택)</div>
          </div>
          <div className="flex items-center text-xs">
            <div className="text-[#424242]">
              {(description?.length as number) > 60 ? 60 : description?.length}/
            </div>
            <div className="text-[#7B7B7B]">60</div>
          </div>
        </label>
        <textarea
          className="min-h-[108px] w-full resize-none rounded-[5px] border border-[#9F9F9F] p-3 text-sm"
          id="description"
          value={description}
          maxLength={60}
          onChange={handleDescriptionChange}
          required
        />
      </div>

      {/* SNS 링크 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="storeLink" className="flex items-center gap-1">
          <div className="text-sm font-medium">SNS 링크</div>
          <div className="text-xs">(선택)</div>
        </label>
        <input
          className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm"
          type="text"
          id="storeLink"
          value={storeLink}
          onChange={handleStoreLinkChange}
          required
        />
      </div>

      {/* 기타 정보 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="features" className="flex items-center gap-1">
          <div className="text-sm font-medium">기타 정보</div>
          <div className="text-xs">(선택)</div>
        </label>
        <div className="flex flex-wrap gap-2">
          {FEATURES.map(({ icon, title, id }) => (
            <button
              type="button"
              key={title}
              id={id}
              onClick={() => handleFeatureToggle(id)}
              className={cn(
                'flex items-center justify-center gap-[10px] rounded-[12px] border p-3',
                features[id as keyof typeof features]
                  ? 'border-primary bg-[#FFF8E7]'
                  : 'border-[#B1B1B1]',
              )}
            >
              <div className="h-[27px] w-[27px]">{icon}</div>
              <div className="text-xs">{title}</div>
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={cn(
          'flex w-full items-center justify-center rounded-[99px] p-[10px] font-semibold text-[#393939]',
          isFormValid
            ? 'bg-primary cursor-pointer'
            : 'cursor-not-allowed bg-[#BBB6AA] opacity-50',
        )}
      >
        다음
      </button>
    </form>
  );
}
