'use client';

import { useForm, Controller } from 'react-hook-form';
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
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { TagSelectModal } from '../_modals/TagSelectModal';
import { OperatingHoursSelectModal } from '../_modals/OperatingHoursSelectModal';
import { TAG_CATEGORIES, TAGS } from '../_consts/tag';
import { DAYS_OF_WEEK } from '../_consts/operatingHours';
import { useContext, useEffect, useState } from 'react';

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

interface FormInputs {
  name: string;
  phone: string;
  address: string;
  detailAddress: string;
  storeLink: string;
  description: string;
  tags: number[];
  operatingHours: OperatingHoursItem[];
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
    updateOperatingHours,
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
      storeLink: storeData.storeLink,
      description: storeData.description,
      tags: storeData.tagIds || [],
      operatingHours: storeData.operatingHours || [],
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
  const operatingHours = watch('operatingHours');

  // isValid 상태 관리
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isValid =
      !!name?.trim() &&
      !!phone?.trim() &&
      validatePhoneNumber(phone) &&
      !!address?.trim() &&
      !!detailAddress?.trim() &&
      tags?.length > 0 &&
      operatingHours?.length > 0;

    setIsFormValid(isValid);
  }, [name, phone, address, detailAddress, tags, operatingHours]);

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

  const closeOperatingHoursModal = (operatingHours?: OperatingHoursItem[]) => {
    if (operatingHours) {
      setValue('operatingHours', operatingHours);
    }
    pop('modal');
  };

  const openOperatingHoursModal = () => {
    push('modal', {
      component: (
        <OperatingHoursSelectModal
          onClose={closeOperatingHoursModal}
          initialOperatingHours={watch('operatingHours')}
        />
      ),
    });
  };

  const handleStoreImageFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      const currentFiles = watch('storeImageFiles');
      setValue('storeImageFiles', [...currentFiles, ...fileArray]);
    }
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
      alert('전화번호 형식을 확인해주세요.\n예시: 000-0000-0000');
      return;
    }

    const { latitude, longitude } = { latitude: 0, longitude: 0 }; // TODO: 이건 마지막 API 보낼 때 업데이트하도록. 지금은 임시

    updateBasicInfo({
      name: data.name,
      phone: data.phone,
      address: data.address,
      detailAddress: data.detailAddress,
      latitude,
      longitude,
      storeLink: data.storeLink,
      description: data.description,
    });
    updateOperatingHours(data.operatingHours);
    updateTags(data.tags);
    updateStoreImages(data.storeImageFiles);
    updateOwnerPickImages(data.ownerPickImageFiles);
    updateFeatures(data.features);

    completeStep(RegisterStep.BASIC_INFO);
    goToNextStep();

    router.push(`${NavigationPathname.OwnerRegisterMenu}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-y-[30px] p-4"
    >
      {/* 가게명 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="flex items-center gap-1">
          <div className="text-sm font-medium">가게명</div>
          <div className="text-xs">(필수)</div>
        </label>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
              type="text"
              placeholder="가게 이름을 입력해주세요"
            />
          )}
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
            <Controller
              name="storeImageFiles"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {value.map((image, index) => (
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
                        className="bg-primary absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-sm text-white"
                        onClick={() => handleRemoveStoreImageFiles(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {value.length < 4 &&
                    Array.from({ length: 3 - value.length }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
                      />
                    ))}
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* 사장님 픽 사진 */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="ownerPickImageFiles"
          className="flex items-center gap-1"
        >
          <div className="text-sm font-medium">사장님 픽 홍보용 사진</div>
          <div className="text-xs">(선택)</div>
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
          <div className="flex flex-wrap gap-2">
            <label
              className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
              htmlFor="ownerPickImageFiles"
            >
              <div className="h-7 w-7">
                <IconPicture className="h-full w-full text-[#545454]" />
              </div>
            </label>
            <Controller
              name="ownerPickImageFiles"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {value.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="h-[68px] w-[68px] overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1]">
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
                        className="bg-primary absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full text-sm text-white"
                        onClick={() => handleRemoveOwnerPickImageFiles(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {value.length < 4 &&
                    Array.from({ length: 3 - value.length }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-md border-[1.17px] border-[#B1B1B1] bg-[#DBDBDB]"
                      />
                    ))}
                </>
              )}
            />
          </div>
        </div>
      </div>

      {/* 전화번호 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="flex items-center gap-1">
          <div className="text-sm font-medium">전화번호</div>
          <div className="text-xs">(필수)</div>
        </label>
        <Controller
          name="phone"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm"
              type="text"
              placeholder="000-0000-0000"
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9-]/g, '');
                field.onChange(value);
              }}
            />
          )}
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
            type="button"
            onClick={openAddressModal}
            className="absolute right-[10px] top-[50%] -translate-y-1/2"
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
                className="w-full rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] text-sm"
                type="text"
                placeholder="주소를 입력해주세요"
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
            <input
              {...field}
              className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm font-medium"
              type="text"
              placeholder="상세주소 (예.2층)"
            />
          )}
        />
      </div>

      {/* 운영시간 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="operatingHours" className="flex items-center gap-1">
          <div className="text-sm font-medium">운영시간</div>
          <div className="text-xs">(필수)</div>
        </label>
        <Controller
          name="operatingHours"
          control={control}
          rules={{ required: true }}
          render={({ field: { value } }) =>
            value.length > 0 ? (
              <div className="relative">
                <button
                  onClick={openOperatingHoursModal}
                  type="button"
                  className="absolute right-[10px] top-5 -translate-y-1/2"
                >
                  <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
                </button>
                <div className="flex w-full flex-wrap gap-1 rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] pr-8 text-sm">
                  {value.map((item) => {
                    const day = DAYS_OF_WEEK.find(
                      (d) => d.en === item.dayOfWeek,
                    );
                    return (
                      <div
                        key={item.dayOfWeek}
                        className="rounded-[3px] border-[0.3px] border-[#9F9F9F] bg-white px-2 py-1 text-xs text-[#393939]"
                      >
                        {day?.kr} {item.openingTime} ~ {item.closingTime}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
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
                  placeholder="운영시간을 입력해주세요"
                  disabled
                />
              </div>
            )
          }
        />
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
        <Controller
          name="tags"
          control={control}
          rules={{ required: true }}
          render={({ field: { value } }) =>
            value.length > 0 ? (
              <div className="relative">
                <button
                  onClick={openTagModal}
                  type="button"
                  className="absolute right-[10px] top-5 -translate-y-1/2"
                >
                  <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
                </button>
                <div className="flex w-full flex-wrap gap-1 rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] pr-8 text-sm">
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
                        className="rounded-[3px] border-[0.3px] border-[#9F9F9F] bg-white px-2 py-1 text-xs text-[#393939]"
                      >
                        {category.categoryName}&nbsp;{'>'}&nbsp;{tag.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={openTagModal}
                  type="button"
                  className="absolute right-[10px] top-[50%] -translate-y-1/2"
                >
                  <IconDirection className="h-full w-full -rotate-90 text-[#6F6F6F]" />
                </button>
                <input
                  className="w-full rounded-[5px] border border-[#9F9F9F] bg-[#F0F0F0] p-[10px] text-sm"
                  type="text"
                  placeholder="가게 태그를 선택해주세요"
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
            <div className="text-sm font-medium">한 줄 소개</div>
            <div className="text-xs">(선택)</div>
          </div>
          <Controller
            name="description"
            control={control}
            render={({ field: { value } }) => (
              <div className="flex items-center text-xs">
                <div className="text-[#424242]">
                  {(value?.length as number) > 60 ? 60 : value?.length}/
                </div>
                <div className="text-[#7B7B7B]">60</div>
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
              className="min-h-[108px] w-full resize-none rounded-[5px] border border-[#9F9F9F] p-3 text-sm"
              maxLength={60}
            />
          )}
        />
      </div>

      {/* SNS 링크 */}
      <div className="flex flex-col gap-2">
        <label htmlFor="storeLink" className="flex items-center gap-1">
          <div className="text-sm font-medium">SNS 링크</div>
          <div className="text-xs">(선택)</div>
        </label>
        <Controller
          name="storeLink"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              className="w-full rounded-[5px] border border-[#9F9F9F] p-[10px] text-sm"
              type="text"
            />
          )}
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
            <Controller
              key={id}
              name={`features.${id}` as any}
              control={control}
              render={({ field: { value, onChange } }) => (
                <button
                  type="button"
                  onClick={() => onChange(!value)}
                  className={cn(
                    'flex items-center justify-center gap-[10px] rounded-[12px] border p-3',
                    value
                      ? 'border-[#825D00] bg-[#FFE4A1] text-[#614500]'
                      : 'border-[#9F9F9F] bg-white text-[#393939]',
                  )}
                >
                  <div className="h-[27px] w-[27px]">{icon}</div>
                  <div className="text-xs">{title}</div>
                </button>
              )}
            />
          ))}
        </div>
      </div>

      <button
        type="submit"
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
