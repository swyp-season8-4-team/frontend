'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { OperatingHoursItem } from '@repo/entity/src/store';
import Image from 'next/image';
import IconPicture from '@repo/design-system/components/icons/IconPicture2';

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
  const [storeLink, setStoreLink] = useState(storeData.storeLink);
  const [description, setDescription] = useState(storeData.description);

  const [tagIds, setTagIds] = useState<number[]>(storeData.tagIds || []);
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

  const handleInputChange = () => {
    setIsFormDirty(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleStoreLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreLink(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    updateTags(tagIds);
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
      className="mx-auto flex max-w-md flex-col gap-y-[30px] p-4"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex items-center gap-1">
          <div className="text-sm">가게명</div>
          <div className="text-xs">(필수)</div>
        </label>
        <input
          className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="가게 이름을 입력해주세요"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="storeImages" className="flex items-center gap-1">
          <div className="text-sm">가게 사진</div>
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
              className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
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

      <div className="mt-6 flex justify-end">
        <button type="submit" className="px-6 py-2 text-white">
          다음
        </button>
      </div>
    </form>
  );
}
