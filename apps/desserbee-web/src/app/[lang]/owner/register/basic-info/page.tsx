'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { Store } from '@repo/entity/src/store';
import Image from 'next/image';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import IconCar from '@repo/design-system/components/icons/IconCar2';
import IconDog from '@repo/design-system/components/icons/IconDog2';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler2';
import { cn } from '@repo/ui/lib/utils';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { TagSelectModal } from '../_modals/TagSelectModal';
import { TAG_CATEGORIES, TAGS } from '../_consts/tag';
import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import IconCheck from '@repo/design-system/components/icons/IconCheck';

const FEATURES = [
  {
    icon: <IconCar className="h-full w-full text-[#E06A00]" />,
    title: '주차 가능',
    id: 'parkingYn',
  },
  {
    icon: <IconDog className="h-full w-full" />,
    title: '반려 함께',
    id: 'animalYn',
  },
  {
    icon: <IconTumbler className="h-full w-full" />,
    title: '텀블러 할인',
    id: 'tumblerYn',
  },
];

interface FormInputs
  extends Pick<
    Store,
    | 'name'
    | 'phone'
    | 'address'
    | 'primaryStoreLink'
    | 'storeLinks'
    | 'latitude'
    | 'longitude'
    | 'animalYn'
    | 'tumblerYn'
    | 'parkingYn'
    | 'averageRating'
    | 'status'
    | 'holidays'
    | 'description'
    | 'notice'
  > {
  detailAddress: string;
  tags: number[];
  storeImageFiles: File[];
  ownerPickImageFiles: File[];
  features: {
    animalYn: boolean;
    tumblerYn: boolean;
    parkingYn: boolean;
  };
}

export default function RegisterBasicInfoPage() {
  const router = useRouter();
  const { push, pop } = useContext(PortalContext);
  const {
    updateBasicInfo,
    updateStoreImages,
    updateOwnerPickImages,
    updateTags,
    updateFeatures,
    completeStep,
    goToNextStep,
    storeData,
  } = useRegister();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormInputs>({
    defaultValues: {
      name: storeData.name,
      phone: storeData.phone,
      address: storeData.address,
      detailAddress: storeData.detailAddress,
      storeLinks: storeData.storeLinks,
      primaryStoreLink: storeData.primaryStoreLink,
      description: storeData.description,
      tags: storeData.tagIds || [],
      storeImageFiles: storeData.storeImageFiles || [],
      ownerPickImageFiles: storeData.ownerPickImageFiles || [],
      features: {
        animalYn: storeData.animalYn || false,
        tumblerYn: storeData.tumblerYn || false,
        parkingYn: storeData.parkingYn || false,
      },
    },
    mode: 'onChange',
  });

  // 필수 필드들의 값을 watch로 구독
  const name = watch('name');
  const phone = watch('phone');
  const address = watch('address');
  const detailAddress = watch('detailAddress');
  const tags = watch('tags');

  // isValid 상태 관리
  const [isFormValid, setIsFormValid] = useState(false);

  const [storeLinks, setStoreLinks] = useState<string[]>([]);
  const [primaryLinkIndex, setPrimaryLinkIndex] = useState<number | undefined>(
    undefined,
  );

  // useEffect를 사용하여 클라이언트 사이드에서만 저장된 데이터 불러오기
  useEffect(() => {
    if (storeData.storeLinks?.length) {
      setStoreLinks(storeData.storeLinks);

      if (storeData.primaryStoreLink) {
        const index = storeData.storeLinks?.findIndex(
          (link) => link === storeData.primaryStoreLink,
        );
        setPrimaryLinkIndex(index >= 0 ? index : undefined);
      }
    }
  }, [storeData.storeLinks, storeData.primaryStoreLink]);

  useEffect(() => {
    const isValid =
      !!name?.trim() &&
      !!phone?.trim() &&
      validatePhoneNumber(phone) &&
      !!address?.trim() &&
      !!detailAddress?.trim() &&
      tags?.length > 0;
    setIsFormValid(isValid);
  }, [name, phone, address, detailAddress, tags]);

  // 초기 마운트 시 유효성 검사 실행
  useEffect(() => {
    if (storeData.name) {
      trigger();
    }
  }, [trigger, storeData]);

  // Daum 우편번호 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const openAddressModal = () => {
    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        const addr = data.roadAddress || data.jibunAddress;
        setValue('address', addr);
      },
    }).open();
  };

  const closeTagModal = (tags?: number[]) => {
    if (tags) {
      setValue('tags', tags);
    }
    pop('modal');
  };

  const openTagModal = () => {
    push('modal', {
      component: (
        <TagSelectModal onClose={closeTagModal} initialTags={watch('tags')} />
      ),
    });
  };

  const handleStoreImageFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const currentLength = watch('storeImageFiles').length;
    const remainingSlots = 3 - currentLength;

    if (remainingSlots <= 0) return;

    const newFiles = files.slice(0, remainingSlots);
    const currentFiles = watch('storeImageFiles');
    setValue('storeImageFiles', [...currentFiles, ...newFiles]);

    // 입력 필드 초기화
    e.target.value = '';
  };

  const handleRemoveStoreImageFiles = (index: number) => {
    const currentFiles = watch('storeImageFiles');
    setValue(
      'storeImageFiles',
      currentFiles.filter((_, i) => i !== index),
    );
  };

  const handleOwnerPickImageFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const currentFiles = watch('ownerPickImageFiles');
      setValue('ownerPickImageFiles', [...currentFiles, ...fileArray]);
    }
  };

  const handleRemoveOwnerPickImageFiles = (index: number) => {
    const currentFiles = watch('ownerPickImageFiles');
    setValue(
      'ownerPickImageFiles',
      currentFiles.filter((_, i) => i !== index),
    );
  };

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(\d{3,4})-(\d{4})-(\d{4})$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = (data: FormInputs) => {
    if (!validatePhoneNumber(data.phone)) {
      alert('전화번호 형식을 확인해주세요.\n예시: 0000-0000-0000');
      return;
    }

    const { latitude, longitude } = { latitude: 0, longitude: 0 }; // TODO: 이건 마지막 API 보낼 때 업데이트하도록. 지금은 임시

    updateBasicInfo({
      ...data,
      primaryStoreLink:
        primaryLinkIndex !== undefined ? storeLinks[primaryLinkIndex] : '',
      storeLinks: storeLinks,
    });
    updateTags(data.tags);
    updateStoreImages(data.storeImageFiles);
    updateOwnerPickImages(data.ownerPickImageFiles);
    updateFeatures(data.features);

    completeStep(RegisterStep.BASIC_INFO);
    goToNextStep();

    router.push(`${NavigationPathname.OwnerRegisterOperatingHours}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-y-6 p-4"
    >
      {/* 가게명 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex items-center gap-1">
          <div className="text-neutral-30 text-base font-medium">가게명</div>
          <div className="text-error-60 text-sm">*</div>
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                className="w-full rounded-[5px] border border-[#A6A6A6] p-[10px] pr-10 text-sm font-medium"
                type="text"
                placeholder="사업자등록증에 기재된 가게명 입력"
              />
              {field.value && (
                <button
                  type="button"
                  className="absolute right-4 top-[50%] flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                  onClick={() => field.onChange('')}
                >
                  <IconXRound className="h-full w-full text-[#CDC8C3]" />
                </button>
              )}
            </div>
          )}
        />
      </div>

      {/* 가게사진 */}
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-1">
            <div className="text-neutral-30 text-base font-medium">
              대표 사진
            </div>
            <div className="text-error-60 text-sm">*</div>
          </div>
          <div className="text-neutral-40 text-xs">1~3장 업로드 가능</div>
        </label>
        <div className="flex flex-col gap-2">
          <input
            className="hidden"
            type="file"
            id="storeImages"
            onChange={handleStoreImageFilesChange}
            accept="image/*"
            multiple
            disabled={watch('storeImageFiles').length >= 3}
          />
          <div className="flex flex-wrap gap-[15px]">
            <label
              className={cn(
                'bg-neutral-70 flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-[9.38px]',
                watch('storeImageFiles').length >= 3
                  ? 'cursor-not-allowed'
                  : 'border-neutral-40 cursor-pointer border-[1.17px]',
              )}
              htmlFor="storeImages"
            >
              <div className="h-5 w-5">
                <IconPlusRound
                  className={cn(
                    'h-full w-full',
                    watch('storeImageFiles').length >= 3
                      ? 'text-neutral-50'
                      : 'text-[#545454]',
                  )}
                />
              </div>
            </label>
            <Controller
              name="storeImageFiles"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {value.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="border-neutral-40 h-[68px] w-[68px] overflow-hidden rounded-[9.38px] border-[1.17px]">
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
                        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-sm text-white shadow-[0px_1px_3px_1px_#39393921]"
                        onClick={() => handleRemoveStoreImageFiles(index)}
                      >
                        <IconXRound className="h-full w-full text-[#CDC8C3]" />
                      </button>
                    </div>
                  ))}
                  {value.length < 1 && (
                    <div className="text-neutral-40 flex grow flex-col items-center justify-center rounded-[12px] bg-[#EFEDEB] text-sm">
                      <div>가게를 대표하는 사진을</div>
                      <div>3장 선택해주세요</div>
                    </div>
                  )}
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* 사장님 픽 사진 */}
      <div className="flex flex-col">
        <label className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-1">
            <div className="text-neutral-30 text-base font-medium">
              추가 사진
            </div>
          </div>
          <div className="text-neutral-40 text-xs">1~n장 업로드 가능</div>
        </label>
        <div className="flex flex-col gap-2">
          <input
            className="hidden"
            type="file"
            id="ownerPickImageFiles"
            onChange={handleOwnerPickImageFilesChange}
            accept="image/*"
            multiple
          />
          <div className="flex items-center gap-[15px]">
            <div className="pt-2">
              <label
                className="border-neutral-40 bg-neutral-70 flex h-[68px] w-[68px] flex-shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[9.38px] border-[1.17px]"
                htmlFor="ownerPickImageFiles"
              >
                <div className="h-5 w-5">
                  <IconPlusRound className="h-full w-full text-[#545454]" />
                </div>
              </label>
            </div>
            <div className="flex flex-1 gap-[15px] overflow-x-auto pt-2">
              <Controller
                name="ownerPickImageFiles"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    {value.length > 0 ? (
                      value.map((image, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <div className="h-[68px] w-[68px] overflow-hidden rounded-[9.38px] border-[1.17px] border-[#96938E]">
                            <Image
                              width={100}
                              height={100}
                              src={URL.createObjectURL(image)}
                              alt={`홍보용 가게 사진 ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#CDC8C3] text-sm text-white shadow-[0px_1px_3px_1px_#39393921]"
                            onClick={() =>
                              handleRemoveOwnerPickImageFiles(index)
                            }
                          >
                            <IconXRound className="h-full w-full text-[#CDC8C3]" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-neutral-40 flex h-[68px] w-full flex-col items-center justify-center rounded-[12px] bg-[#EFEDEB] text-sm">
                        <div>사장님 픽 홍보용 사진을</div>
                        <div>선택해주세요</div>
                      </div>
                    )}
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="flex items-center gap-1">
          <div className="text-neutral-30 text-base font-medium">전화번호</div>
          <div className="text-error-60 text-sm">*</div>
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                className="w-full rounded-[5px] border border-[#A6A6A6] p-[10px] pr-10 text-sm"
                type="text"
                placeholder="전화번호 (예. 010-1234-5567)"
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9-]/g, '');
                  field.onChange(value);
                }}
              />
              {field.value && (
                <button
                  type="button"
                  className="absolute right-4 top-[50%] flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                  onClick={() => field.onChange('')}
                >
                  <IconXRound className="h-full w-full text-[#CDC8C3]" />
                </button>
              )}
            </div>
          )}
        />
      </div>

      {/* 주소 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="flex items-center gap-1">
          <div className="text-neutral-30 text-base font-medium">주소</div>
          <div className="text-error-60 text-sm">*</div>
        </label>
        <div onClick={openAddressModal} className="relative cursor-pointer">
          <button
            type="button"
            className="pointer-events-none absolute right-[10px] top-[50%] -translate-y-1/2"
          >
            <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
          </button>
          <Controller
            name="address"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                {...field}
                className="pointer-events-none w-full rounded-[5px] border border-[#A6A6A6] bg-[#F0F0F0] p-[10px] text-sm font-medium"
                type="text"
                placeholder="주소 검색"
                disabled
              />
            )}
          />
        </div>
        <Controller
          name="detailAddress"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                className="w-full rounded-[5px] border border-[#A6A6A6] p-[10px] pr-10 text-sm"
                type="text"
                placeholder="상세주소"
              />
              {field.value && (
                <button
                  type="button"
                  className="absolute right-[10px] top-[50%] flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                  onClick={() => field.onChange('')}
                >
                  <IconXRound className="h-full w-full text-[#CDC8C3]" />
                </button>
              )}
            </div>
          )}
        />
      </div>

      {/* 특성 태그 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="tags" className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-1">
            <div className="text-neutral-30 text-base font-medium">
              특성 태그
            </div>
            <div className="text-error-60 text-sm">*</div>
          </div>
          <div className="text-neutral-40 text-xs">최대 3개 선택</div>
        </label>
        <Controller
          name="tags"
          control={control}
          rules={{ required: true }}
          render={({ field: { value } }) =>
            value.length > 0 ? (
              <div className="relative cursor-pointer" onClick={openTagModal}>
                <button
                  type="button"
                  className="pointer-events-none absolute right-[10px] top-5 -translate-y-1/2"
                >
                  <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
                </button>
                <div className="pointer-events-none flex w-full flex-wrap gap-1 rounded-[5px] border border-[#A6A6A6] bg-[#F0F0F0] p-[10px] pr-8 text-sm">
                  {value.map((tagId) => {
                    const tag = TAGS.find((t) => t.id === tagId);
                    const category = tag
                      ? TAG_CATEGORIES.find(
                          (cat) => cat.categoryId === tag.parentId,
                        )
                      : null;

                    return tag && category ? (
                      <div
                        key={tagId}
                        className="rounded-[3px] border-[0.3px] border-[#A6A6A6] bg-white px-2 py-1 text-xs text-[#393939]"
                      >
                        {category.categoryName}&nbsp;{'>'}&nbsp;{tag.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ) : (
              <div className="relative cursor-pointer" onClick={openTagModal}>
                <button
                  type="button"
                  className="pointer-events-none absolute right-[10px] top-[50%] -translate-y-1/2"
                >
                  <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
                </button>
                <input
                  className="pointer-events-none w-full rounded-[5px] border border-[#A6A6A6] bg-[#F0F0F0] p-[10px] text-sm font-medium"
                  type="text"
                  placeholder="특성 태그 선택"
                  disabled
                />
              </div>
            )
          }
        />
      </div>

      {/* 한 줄 소개 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="flex justify-between">
          <div className="flex items-center gap-1">
            <div className="text-neutral-30 text-base font-medium">
              한 줄 소개
            </div>
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field: { value } }) => (
              <div className="flex items-center text-xs">
                <div className="text-[#424242]">
                  {(value?.length as number) > 100 ? 100 : value?.length}
                </div>
                <div className="text-neutral-50">/100</div>
              </div>
            )}
          />
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              className="min-h-[108px] w-full resize-none rounded-[5px] border border-[#A6A6A6] p-3 text-sm"
              maxLength={100}
              placeholder="사장님 가게를 소개해주세요"
            />
          )}
        />
      </div>

      {/* SNS 링크 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="storeLink" className="flex flex-col gap-[5px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="text-neutral-30 text-base font-medium">
                SNS 링크
              </div>
              <div className="text-error-60 text-sm">*</div>
            </div>
            {storeLinks.length < 3 && (
              <button
                type="button"
                onClick={() => setStoreLinks([...storeLinks, ''])}
                className="text-primary-60 flex items-center gap-[6.33px] px-[10px] py-2 text-center text-xs"
              >
                <div className="h-[14.33px] w-[13.33px]">
                  <IconPlusRound className="text-primary-60 h-full w-full" />
                </div>
                <div>추가</div>
              </button>
            )}
          </div>

          <div className="text-neutral-40 text-xs">
            대표 링크 1~3개 선택 가능
          </div>
        </label>
        <div className="space-y-2">
          {/* 링크 목록 */}
          {storeLinks.map((link, index) => (
            <div key={index} className="flex items-center gap-[15.5px]">
              <button
                type="button"
                className="flex items-center gap-[7px]"
                onClick={() => setPrimaryLinkIndex(index)}
              >
                <div
                  className={cn(
                    'flex aspect-square h-[13.5px] w-[13.5px] items-center justify-center rounded-[1.5px]',
                    primaryLinkIndex === index
                      ? 'bg-secondary-60'
                      : 'bg-[#9D9D9D]',
                  )}
                >
                  <div className="h-2 w-2">
                    <IconCheck className="h-full w-full text-white" />
                  </div>
                </div>
              </button>
              <div className="relative w-full">
                <input
                  type="text"
                  value={link}
                  onChange={(e) => {
                    const newLinks = [...storeLinks];
                    newLinks[index] = e.target.value;
                    setStoreLinks(newLinks);
                  }}
                  className="border-neutral-40 w-full flex-1 rounded-[6px] border px-3 py-2 pr-10 text-sm"
                  placeholder="http://"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newLinks = storeLinks.filter((_, i) => i !== index);
                    setStoreLinks(newLinks);

                    if (newLinks.length === 0) {
                      setPrimaryLinkIndex(undefined);
                    } else if (index === primaryLinkIndex) {
                      setPrimaryLinkIndex(undefined);
                    } else if (
                      primaryLinkIndex !== undefined &&
                      index < primaryLinkIndex
                    ) {
                      setPrimaryLinkIndex((prev) =>
                        prev ? prev - 1 : undefined,
                      );
                    }
                  }}
                  className="absolute right-4 top-[50%] z-10 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center"
                >
                  <div className="w-[13.5px] border border-[#271900]"></div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 기타 정보 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="features" className="flex items-center gap-1">
          <div className="text-neutral-30 text-base font-medium">기타 정보</div>
        </label>
        <div className="flex flex-wrap gap-2">
          {/* 선택 안함 버튼 추가 */}
          <button
            type="button"
            onClick={() => {
              // 모든 feature를 false로 설정
              FEATURES.forEach(({ id }) => {
                setValue(`features.${id}` as any, false);
              });
            }}
            className={cn(
              'text-neutral-30 flex min-w-[93px] items-center justify-center rounded-[6px] border px-[10px] py-2',
              // 모든 feature가 false일 때 활성화 스타일 적용
              Object.values(watch('features')).every((v) => !v)
                ? 'border-primary-60 bg-primary-90'
                : 'border-[#CDC8C3] bg-white',
            )}
          >
            <div className="text-[11px]">선택 안함</div>
          </button>

          {/* 기존 feature 버튼들 */}
          {FEATURES.map(({ icon, title, id }) => (
            <Controller
              key={id}
              name={`features.${id}` as any}
              control={control}
              render={({ field: { value, onChange } }) => (
                <button
                  type="button"
                  onClick={() => onChange(!value)}
                  className={cn(
                    'text-neutral-30 flex min-w-[93px] items-center justify-center gap-2 rounded-[6px] border px-[10px] py-2 text-[11px]',
                    value
                      ? 'border-primary-60 bg-primary-90'
                      : 'border-[#CDC8C3] bg-white',
                  )}
                >
                  <div className="h-4 w-4">{icon}</div>
                  <div className="text-[11px]">{title}</div>
                </button>
              )}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
        className={cn(
          'flex w-full items-center justify-center rounded-[6px] p-[12px] font-semibold',
          isFormValid
            ? 'bg-primary-80 cursor-pointer text-[#412D00]'
            : 'bg-neutral-70 cursor-not-allowed text-neutral-50',
        )}
      >
        다음
      </button>
    </form>
  );
}
