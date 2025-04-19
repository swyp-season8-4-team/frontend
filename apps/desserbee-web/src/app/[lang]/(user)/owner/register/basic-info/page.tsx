'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { Store } from '@repo/entity/src/store';
import Image from 'next/image';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import IconDirection from '@repo/design-system/components/icons/IconDirection';
import IconCar from '@repo/design-system/components/icons/IconCar2';
import IconDog from '@repo/design-system/components/icons/IconDog2';
import IconTumbler from '@repo/design-system/components/icons/IconTumbler2';
import IconMinusRound from '@repo/design-system/components/icons/IconMinusRound';
import { cn } from '@repo/ui/lib/utils';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { TagSelectModal } from '../_modals/TagSelectModal';
import { TAG_CATEGORIES, TAGS } from '../_consts/tag';
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ChangeEvent,
} from 'react';
import { CheckButton } from '@repo/design-system/components/CheckButton';
import { PhotoAddBox } from '@repo/design-system/components/PhotoAddBox';
import { PhotoBox } from '@repo/design-system/components/PhotoBox';
import { TitleLabel } from '../_components/TitleLabel';
import { HiddenImageInput } from '../_components/HiddenImageInput';
import { NoneImageBox } from '../_components/NoneImageBox';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { AddButton } from '../_components/AddButton';
import type { StoreLink } from '@repo/entity/src/store';
import IconWarn from '@repo/design-system/components/icons/IconWarn';
import { ValidationError } from '../_components/ValidationError';

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
    | 'notices'
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

const isValidURL = (url: string) => {
  const urlRegex = /^(https?|ftp):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
  return urlRegex.test(url);
};

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
      storeLinks: storeData.storeLinks || [],
      description: storeData.description,
      tags: storeData.tagIds || [],
      storeImageFiles: storeData._storeImageFiles || [],
      ownerPickImageFiles: storeData._ownerPickImageFiles || [],
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
  const tags = watch('tags');
  const storeImageFiles = watch('storeImageFiles');

  // isValid 상태 관리
  const [isFormValid, setIsFormValid] = useState(false);

  // storeLinks state 제거하고 form으로 관리
  const storeLinks = watch('storeLinks');

  // 초기 데이터 로드
  useEffect(() => {
    if (storeData.storeLinks?.length) {
      setValue(
        'storeLinks',
        storeData.storeLinks.map((link, index) => ({
          url: typeof link === 'string' ? link : link.url,
          isPrimary: typeof link === 'string' ? index === 0 : link.isPrimary,
        })),
      );
    } else {
      // 초기 데이터가 없을 때 빈 배열로 초기화
      setValue('storeLinks', []);
    }
  }, [storeData.storeLinks, setValue]);

  // 링크 추가 버튼 핸들러
  const handleAddLink = () => {
    const isFirstLink = storeLinks.length === 0;
    setValue('storeLinks', [
      ...storeLinks,
      { url: '', isPrimary: isFirstLink },
    ]);
  };

  // 링크 수정 핸들러
  const handleLinkChange = (index: number, url: string) => {
    const newLinks = storeLinks.map((link, i) =>
      i === index ? { ...link, url } : link,
    );
    setValue('storeLinks', newLinks);
    trigger('storeLinks'); // 유효성 검사 트리거
  };

  // 대표 링크 설정 핸들러
  const handleSetPrimary = (index: number) => {
    const newLinks = storeLinks.map((link, i) => ({
      ...link,
      isPrimary: i === index,
    }));
    setValue('storeLinks', newLinks);
  };

  // 링크 삭제 핸들러
  const handleRemoveLink = (index: number) => {
    setValue(
      'storeLinks',
      storeLinks.filter((_, i) => i !== index),
    );
    trigger('storeLinks'); // 삭제 후 유효성 검사 트리거
  };

  useEffect(() => {
    const isValid =
      !!name?.trim() &&
      !!phone?.trim() &&
      validatePhoneNumber(phone) &&
      !!address?.trim() &&
      storeImageFiles.length > 0 &&
      tags?.length > 0;
    setIsFormValid(isValid);
  }, [name, phone, address, tags, storeImageFiles]);

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

  const handleStoreImageFilesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const currentLength = watch('storeImageFiles').length;
      const remainingSlots = 3 - currentLength;

      if (remainingSlots <= 0) return;

      const newFiles = files.slice(0, remainingSlots);
      const currentFiles = watch('storeImageFiles');
      setValue('storeImageFiles', [...currentFiles, ...newFiles]);

      e.target.value = '';
    },
    [watch, setValue],
  );

  const handleRemoveStoreImageFiles = useCallback(
    (index: number) => {
      const currentFiles = watch('storeImageFiles');
      setValue(
        'storeImageFiles',
        currentFiles.filter((_, i) => i !== index),
      );
    },
    [watch, setValue],
  );

  const handleOwnerPickImageFilesChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const fileArray = Array.from(e.target.files);
        const currentFiles = watch('ownerPickImageFiles');
        setValue('ownerPickImageFiles', [...currentFiles, ...fileArray]);
      }
    },
    [watch, setValue],
  );

  const handleRemoveOwnerPickImageFiles = useCallback(
    (index: number) => {
      const currentFiles = watch('ownerPickImageFiles');
      setValue(
        'ownerPickImageFiles',
        currentFiles.filter((_, i) => i !== index),
      );
    },
    [watch, setValue],
  );

  // 이미지 URL 메모이제이션
  const storeImageUrls = useMemo(() => {
    return watch('storeImageFiles').map((file) => URL.createObjectURL(file));
  }, [watch('storeImageFiles')]);

  const ownerPickImageUrls = useMemo(() => {
    return watch('ownerPickImageFiles').map((file) =>
      URL.createObjectURL(file),
    );
  }, [watch('ownerPickImageFiles')]);

  // cleanup function for URLs
  useEffect(() => {
    return () => {
      storeImageUrls.forEach(URL.revokeObjectURL);
      ownerPickImageUrls.forEach(URL.revokeObjectURL);
    };
  }, [storeImageUrls, ownerPickImageUrls]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(\d{3,4})-(\d{4})-(\d{4})$/;
    return phoneRegex.test(phone);
  };

  const onSubmit = (data: FormInputs) => {
    // if (!validatePhoneNumber(data.phone)) {
    //   alert('전화번호 형식을 확인해주세요.\n예시: 0000-0000-0000');
    //   return;
    // }

    if (!isFormValid) return;

    const { tags, ...rest } = data;

    updateBasicInfo({
      ...rest,
      storeLinks: data.storeLinks,
    });
    updateTags(tags);
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
        <TitleLabel title="가게명" isPrimary={true} />
        <Controller
          name="name"
          control={control}
          rules={{
            required: '가게명을 입력해주세요',
            minLength: { value: 1, message: '가게명을 입력해주세요' },
          }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                className={cn(
                  'mb-2 w-full rounded-[5px] border p-[10px] pr-10 text-sm font-medium',
                  errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                )}
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

              {errors.name && (
                <ValidationError errorMessage={errors.name.message} />
              )}
            </div>
          )}
        />
      </div>

      {/* 가게사진 */}
      <div className="flex flex-col gap-2">
        <TitleLabel
          title="대표 사진"
          isPrimary={true}
          description="1~3장 업로드 가능"
        />
        <div className="flex flex-col gap-2">
          <HiddenImageInput
            id="storeImages"
            onChange={handleStoreImageFilesChange}
            disabled={watch('storeImageFiles').length >= 3}
            multiple
          />
          <div className="flex flex-wrap gap-[15px]">
            <PhotoAddBox
              htmlFor="storeImages"
              disabled={watch('storeImageFiles').length >= 3}
            />
            <Controller
              name="storeImageFiles"
              control={control}
              rules={{
                validate: (value) =>
                  value.length > 0 || '대표 사진을 1장 이상 업로드해주세요',
              }}
              render={({ field: { value } }) => (
                <>
                  {value.map((_, index) => (
                    <div key={index} className="relative">
                      <PhotoBox
                        image={
                          <Image
                            width={100}
                            height={100}
                            src={storeImageUrls[index]}
                            alt={`가게 사진 ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        }
                        deleteFunction={() =>
                          handleRemoveStoreImageFiles(index)
                        }
                      />
                    </div>
                  ))}
                  <NoneImageBox
                    isShown={value.length < 1}
                    description={
                      <>
                        <div>가게를 대표하는 사진을</div>
                        <div>3장 선택해주세요</div>
                      </>
                    }
                  />
                </>
              )}
            />
          </div>
          {errors.storeImageFiles && (
            <ValidationError errorMessage={errors.storeImageFiles.message} />
          )}
        </div>
      </div>

      {/* 사장님 픽 사진 */}
      <div className="flex flex-col">
        <TitleLabel title="추가 사진" description="1~n장 업로드 가능" />
        <div className="flex flex-col gap-2">
          <HiddenImageInput
            id="ownerPickImageFiles"
            onChange={handleOwnerPickImageFilesChange}
            multiple
          />
          <div className="flex items-center gap-[15px]">
            <div className="pt-2">
              <PhotoAddBox htmlFor="ownerPickImageFiles" />
            </div>
            <div className="flex flex-1 gap-[15px] overflow-x-auto pt-2">
              <Controller
                name="ownerPickImageFiles"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    {value.map((_, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <PhotoBox
                          image={
                            <Image
                              width={100}
                              height={100}
                              src={ownerPickImageUrls[index]}
                              alt={`홍보용 가게 사진 ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          }
                          deleteFunction={() =>
                            handleRemoveOwnerPickImageFiles(index)
                          }
                        />
                      </div>
                    ))}
                    <NoneImageBox
                      isShown={value.length < 1}
                      description={
                        <>
                          <div>사장님 픽 홍보용 사진을</div>
                          <div>선택해주세요</div>
                        </>
                      }
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-2">
        <TitleLabel title="전화번호" isPrimary={true} />
        <Controller
          name="phone"
          control={control}
          rules={{
            required: '전화번호를 입력해주세요',
            validate: (value) =>
              validatePhoneNumber(value) ||
              '전화번호 형식을 확인해주세요 (예: 0000-0000-0000)',
          }}
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                className={cn(
                  'mb-2 w-full rounded-[5px] border p-[10px] pr-10 text-sm',
                  errors.phone ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                )}
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
              {errors.phone && (
                <ValidationError errorMessage={errors.phone.message} />
              )}
            </div>
          )}
        />
      </div>

      {/* 주소 */}
      <div className="flex flex-col gap-2">
        <TitleLabel title="주소" isPrimary={true} />
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
            rules={{ required: '주소를 입력해주세요' }}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  className={cn(
                    'pointer-events-none w-full rounded-[5px] border bg-[#F0F0F0] p-[10px] text-sm font-medium',
                    errors.address ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                  )}
                  type="text"
                  placeholder="주소 검색"
                  disabled
                />
              </div>
            )}
          />
        </div>
        <Controller
          name="detailAddress"
          control={control}
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
        {errors.address && (
          <ValidationError errorMessage={errors.address.message} />
        )}
      </div>

      {/* 특성 태그 */}
      <div className="flex flex-col gap-2">
        <TitleLabel
          title="특성 태그"
          isPrimary={true}
          description="최대 3개 선택"
        />
        <Controller
          name="tags"
          control={control}
          rules={{
            required: '특성 태그를 선택해주세요',
            validate: (value) => value.length > 0 || '특성 태그를 선택해주세요',
          }}
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
        {errors.tags && <ValidationError errorMessage={errors.tags.message} />}
      </div>

      {/* 한 줄 소개 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="description" className="flex justify-between">
          <TitleLabel title="한 줄 소개" />
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
              onInput={(e) => {
                const value = e.currentTarget.value;
                if (value.length > 100) {
                  e.currentTarget.value = value.slice(0, 100); // 100자 이상 입력 방지
                }
              }}
            />
          )}
        />
      </div>

      {/* SNS 링크 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="storeLink" className="flex flex-col gap-[5px]">
          <div className="flex items-center justify-between">
            <TitleLabel title="SNS 링크" />
          </div>
          <div className="text-neutral-40 text-xs">최대 3개 추가</div>
          {storeLinks.length < 3 && (
            <AddButton
              onClick={handleAddLink}
              text="링크 추가"
              clasName="w-fit px-[10px] py-2"
            />
          )}
        </label>
        <Controller
          name="storeLinks"
          control={control}
          rules={{
            validate: (links) => {
              if (links.length === 0) return true;

              // 빈 URL 체크
              if (links.some((link) => !link.url.trim())) {
                return 'SNS 링크를 입력하거나 삭제해주세요';
              }

              // URL 형식 체크
              if (links.some((link) => !isValidURL(link.url.trim()))) {
                return '올바른 URL 형식이 아닙니다 (예: https://www.example.com)';
              }

              return true;
            },
          }}
          render={({ field }) => (
            <div className="space-y-2">
              {storeLinks.map((link, index) => (
                <div key={index} className="flex items-center gap-[15.5px]">
                  <label className="flex gap-2">
                    <CheckButton
                      setFunction={() => handleSetPrimary(index)}
                      isChecked={link.isPrimary}
                    />
                    <div className="text-nowrap text-xs">대표</div>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleLinkChange(index, e.target.value)}
                      className={cn(
                        'border-neutral-40 w-full flex-1 rounded-[6px] border px-3 py-2 pr-10 text-sm',
                        errors.storeLinks
                          ? 'border-[#FF3B30]'
                          : 'border-[#A6A6A6]',
                      )}
                      placeholder="https://"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(index)}
                      className="absolute right-4 top-[50%] z-10 flex h-[18px] w-[18px] -translate-y-1/2 items-center justify-center"
                    >
                      <div className="h-[15px] w-[15px]">
                        <IconMinusRound className="text-neutral-30 h-full w-full" />
                      </div>
                    </button>
                  </div>
                </div>
              ))}
              {errors.storeLinks && (
                <ValidationError errorMessage={errors.storeLinks.message} />
              )}
            </div>
          )}
        />
      </div>

      {/* 기타 정보 */}
      <div className="flex flex-col gap-2">
        <TitleLabel title="기타 정보" />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              FEATURES.forEach(({ id }) => {
                setValue(`features.${id}` as any, false);
              });
            }}
            className={cn(
              'text-neutral-30 flex min-w-[93px] items-center justify-center rounded-[6px] border px-[10px] py-2',
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

      <OliveButton
        type="submit"
        className="font-semibold"
        text="다음"
        isDisabled={!isFormValid}
      />
    </form>
  );
}
