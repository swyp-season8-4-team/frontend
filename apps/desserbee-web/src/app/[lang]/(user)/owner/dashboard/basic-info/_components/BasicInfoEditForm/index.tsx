'use client';

import { useForm, Controller } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import type {
  storeImage,
  Store,
  StoreDetailInfoData,
  updateStoreRequestFormData,
} from '@repo/entity/src/store';
import Image from 'next/image';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import IconDirection from '@repo/design-system/components/icons/IconDirection';

import IconMinusRound from '@repo/design-system/components/icons/IconMinusRound';
import { cn } from '@repo/ui/lib/utils';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { TagSelectModal } from '../../../../register/_modals/TagSelectModal';
import { TAG_CATEGORIES, TAGS } from '../../../../register/_consts/tag';
import {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ChangeEvent,
  useRef,
} from 'react';
import { CheckButton } from '@repo/design-system/components/CheckButton';
import { PhotoAddBox } from '@repo/design-system/components/PhotoAddBox';
import { PhotoBox } from '@repo/design-system/components/PhotoBox';
import { TitleLabel } from '../../../../register/_components/TitleLabel';
import { HiddenImageInput } from '../../../../register/_components/HiddenImageInput';
import { NoneImageBox } from '../../../../register/_components/NoneImageBox';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { ValidationError } from '../../../../register/_components/ValidationError';
import IconPlusRound from '@repo/design-system/components/icons/IconPlusRound';
import { ModalHeader } from '../../../../_components/ModalHeader';
import { FEATURES } from '@/app/[lang]/(user)/_consts/store';
import {
  getStoreDetail,
  updateStore,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { LightOliveButton } from './../../../../../../../../../../../packages/design-system/src/components/buttons/FillButtons/LightOlive';
import { UserContext } from '@/contexts/UserContext';
import MapService from '@repo/usecase/src/mapService';
import { KakaoMapAdapter } from '@repo/infrastructures/src/adapters/kakaoMapAdapter';
import KakaoMapController from '@repo/infrastructures/src/controllers/kakaoMapController';
import Script from 'next/script';
// 깜빡하고 말씀 안 드렸는데, 아이콘은 재사용을 위해 정해진 양식으로 작성 후 따로 관리가 됩니다.
// @repo/design-system/components/icons에서 확인 가능
// 이 부분 설명 필요하면 따로 질문 주세요!

// 변경 (폼 내부에서만 사용)
interface HolidaysFormItem {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
}

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
    // | 'holidays' //스페셜휴무일
    | 'description'
  > {
  holidays: HolidaysFormItem[];
  detailAddress: string;
  tags: number[];
  storeImageFiles: Array<File | storeImage>;
  ownerPickImageFiles: Array<File | storeImage>;
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

const KAKAO_MAP_API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`;
export function BasicInfoEditForm() {
  const router = useRouter();
  const { push, pop } = useContext(PortalContext); // Portal을 사용해서 모달 열고 닫을 수 있음

  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const [storeInfo, setStoreInfo] = useState<StoreDetailInfoData | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [mapService, setMapService] = useState<MapService | null>(null);

  // 삭제된 가게 정보를 저장하는 배열
  const storeImageDeleteIds = useRef<number[]>([]);
  const ownerPickImageDeleteIds = useRef<number[]>([]);

  //유저 정보 가져오기
  const { user } = useContext(UserContext);
  const userUuid = user!.id;

  // 원래 있던 가게 기본 정보 가져오기
  useEffect(() => {
    async function fetchStoreDetails() {
      if (!storeUuid) return;
      const detail = await getStoreDetail({ storeUuid });
      setStoreInfo(detail);
    }
    fetchStoreDetails();
  }, [storeUuid]);

  useEffect(() => {
    if (isScriptLoaded && !mapService) {
      kakao.maps.load(() => {
        const tempDiv = document.createElement('div');
        const map = new kakao.maps.Map(tempDiv, {
          center: new kakao.maps.LatLng(37.566826, 126.9786567),
          level: 3,
        });

        const adapter = new KakaoMapAdapter(map);
        const controller = new KakaoMapController();
        controller['map'] = adapter;

        setMapService(new MapService({ mapController: controller }));
      });
    }
  }, [isScriptLoaded, mapService]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid, isDirty, errors },
    trigger,
  } = useForm<FormInputs>({
    defaultValues: {
      //  기본값 여기서 (폼의 기본값)
      name: '',
      phone: '',
      address: '',
      detailAddress: '',
      holidays: [],
      storeLinks: [],
      description: '',
      tags: [],
      storeImageFiles: [],
      ownerPickImageFiles: [],
      features: {
        animalYn: false,
        tumblerYn: false,
        parkingYn: false,
      },
    },
    mode: 'onChange',
  });

  // 초기값
  const getInitialValues = (storeInfo: StoreDetailInfoData) => ({
    name: storeInfo.name || '',
    phone: storeInfo.phone || '',
    address: storeInfo.address || '',
    detailAddress: '',
    holidays: (storeInfo.holidays || []).map((holiday) => {
      return {
        startDate: holiday.startDate.replace(/\./g, '-'), // "2025.01.01" → "2025-01-01"
        endDate: holiday.endDate?.replace(/\./g, '-'), // "2025.01.03" → "2025-01-03"
        reason: holiday.reason ?? '',
      };
    }),
    storeLinks: (storeInfo.storeLinks as (string | { url: string })[]).map(
      (link) => ({
        url: typeof link === 'string' ? link : link.url,
        isPrimary:
          (typeof link === 'string' ? link : link.url) ===
          storeInfo.primaryStoreLink,
      }),
    ),
    description: storeInfo.description || '',
    tags: (storeInfo.tags || []).map((tag) =>
      typeof tag === 'number' ? tag : tag.id,
    ),
    storeImageFiles: [...(storeInfo.storeImages || [])],
    ownerPickImageFiles: [...(storeInfo.ownerPickImages || [])],
    features: {
      animalYn: storeInfo.animalYn ?? false,
      tumblerYn: storeInfo.tumblerYn ?? false,
      parkingYn: storeInfo.parkingYn ?? false,
    },
  });

  useEffect(() => {
    if (storeInfo) {
      reset(getInitialValues(storeInfo));
      trigger();
    }
  }, [storeInfo, reset, trigger]);

  // 필수 필드들의 값을 watch로 구독
  const name = watch('name');
  const phone = watch('phone');
  const address = watch('address');
  const tags = watch('tags');
  const storeImageFiles = watch('storeImageFiles');

  // 폼 유효성 검사
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // 필수정보 유효성 검사 실행
    const isValid =
      !!name?.trim() &&
      !!phone?.trim() &&
      validatePhoneNumber(phone) &&
      !!address?.trim() &&
      storeImageFiles.length > 0 &&
      tags?.length > 0;
    setIsFormValid(isValid);
  }, [name, phone, address, tags, storeImageFiles]);

  // 링크 관련
  const storeLinks = watch('storeLinks');

  const handleAddLink = () => {
    const isFirstLink = storeLinks.length === 0;
    setValue(
      'storeLinks',
      [...storeLinks, { url: '', isPrimary: isFirstLink }],
      { shouldDirty: true },
    );
  };

  const handleLinkChange = (index: number, url: string) => {
    const newLinks = storeLinks.map((link, i) =>
      i === index ? { ...link, url } : link,
    );
    setValue('storeLinks', newLinks, { shouldDirty: true });
    trigger('storeLinks'); // 유효성 검사 트리거
  };

  const handleSetPrimary = (index: number) => {
    const newLinks = storeLinks.map((link, i) => ({
      ...link,
      isPrimary: i === index,
    }));
    setValue('storeLinks', newLinks, { shouldDirty: true });
  };

  const handleRemoveLink = (index: number) => {
    setValue(
      'storeLinks',
      storeLinks.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
    trigger('storeLinks'); // 삭제 후 유효성 검사 트리거
  };

  // 주소 관련
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
        setValue('address', addr, { shouldDirty: true });
      },
    }).open();
  };

  // 스페셜 휴무일 관련
  const holidays = watch('holidays') || [];

  const getTodayStr = () => {
    // 오늘 날짜 구하는 함수
    const today = new Date();
    return today.toISOString().slice(0, 10); // 'YYYY-MM-DD'
  };

  const handleAddHoliday = () => {
    setValue(
      'holidays',
      [...holidays, { startDate: '', endDate: '', reason: '' }],
      {
        shouldDirty: true,
      },
    );
  };

  const handleHolidayChange = (
    index: number,
    field: 'startDate' | 'endDate' | 'reason',
    value: string,
  ) => {
    const newHolidays = holidays.map((holiday, i) =>
      i === index ? { ...holiday, [field]: value } : holiday,
    );
    setValue('holidays', newHolidays, { shouldDirty: true });
    trigger('holidays');
  };

  const handleRemoveHoliday = (index: number) => {
    setValue(
      'holidays',
      holidays.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
    trigger('holidays'); // 삭제 후 유효성 검사 트리거
  };

  // 태그 관련
  const closeTagModal = (tags?: number[]) => {
    if (tags) {
      setValue('tags', tags, { shouldDirty: true });
    }
    pop('modal');
  };

  const openTagModal = () => {
    // 모달 관련 말씀 안 드렸었는데,
    /**
     *
     * push('modal', {
      component: (
        <컴포넌트 onClose={closeTagModal}  /> // onClose를 props로 받는 컴포넌트 만드셔서 여기 추가 -> onClose에 pop('modal') 포함된 핸들 함수 보내시면 돼요.
      ),
    });
     */
    push('modal', {
      component: (
        <TagSelectModal onClose={closeTagModal} initialTags={watch('tags')} />
      ),
    });
  };

  // 이미지 관련
  const handleStoreImageFilesChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const currentLength = watch('storeImageFiles').length;
      const remainingSlots = 3 - currentLength;

      if (remainingSlots <= 0) return;

      const newFiles = files.slice(0, remainingSlots);
      const currentFiles = watch('storeImageFiles');
      setValue('storeImageFiles', [...currentFiles, ...newFiles], {
        shouldDirty: true,
      });

      e.target.value = '';
    },
    [watch, setValue],
  );

  const handleRemoveStoreImageFiles = (index: number) => {
    const current = watch('storeImageFiles');
    const removed = current[index];

    // File이 아니라면(storeImage 객체라면) id를 저장
    if (!(removed instanceof File) && removed.id !== undefined) {
      storeImageDeleteIds.current.push(removed.id);
    }

    setValue(
      'storeImageFiles',
      current.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  const handleOwnerPickImageFilesChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    setValue(
      'ownerPickImageFiles',
      [...watch('ownerPickImageFiles'), ...files],
      { shouldDirty: true },
    );
  };

  const handleRemoveOwnerPickImageFiles = (index: number) => {
    const current = watch('ownerPickImageFiles');
    const removed = current[index];

    if (!(removed instanceof File) && removed.id !== undefined) {
      ownerPickImageDeleteIds.current.push(removed.id);
    }

    setValue(
      'ownerPickImageFiles',
      current.filter((_, i) => i !== index),
      { shouldDirty: true },
    );
  };

  // 이미지 URL 메모이제이션
  const storeImageUrls = useMemo(
    () =>
      watch('storeImageFiles').map((item) =>
        item instanceof File ? URL.createObjectURL(item) : item.url,
      ),
    [watch('storeImageFiles')],
  );

  const ownerPickImageUrls = useMemo(
    () =>
      watch('ownerPickImageFiles').map((item) =>
        item instanceof File ? URL.createObjectURL(item) : item.url,
      ),
    [watch('ownerPickImageFiles')],
  );

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

  // 날짜 포맷 변환 함수("2025-02-10" → "2025.02.10")
  const formatHolidayDate = (date: string) => {
    const Formatted = date.replace(/-/g, '.');
    return Formatted;
  };

  const onSubmit = async (data: FormInputs) => {
    if (!mapService || !isFormValid) {
      console.log('필수 정보가 누락되었습니다');
      return;
    }

    // 사진 중에 File 만 추출(새로 추가한 사진)
    const storeImageFiles = data.storeImageFiles.filter(
      (file): file is File => file instanceof File,
    );

    const ownerPickImageFiles = data.ownerPickImageFiles.filter(
      (file): file is File => file instanceof File,
    );

    // 주소 변환
    const coordinates = await mapService.convertAddressToCoordinates(
      data.address,
    );

    if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
      console.error('주소를 좌표로 변환하는데 실패했습니다.');
      alert('주소를 지도 좌표로 변환하는데 실패했습니다. 다시 시도해주세요.');
      router.back();
      return;
    }

    // holidays 변환
    const formattedHolidays = data.holidays.map((h) => ({
      startDate: formatHolidayDate(h.startDate),
      endDate: h.endDate ? formatHolidayDate(h.endDate) : undefined,
      reason: h.reason,
    }));

    const formData: updateStoreRequestFormData = {
      storeUuid: storeUuid!,
      requests: {
        userUuid: userUuid,
        name: data.name,
        phone: data.phone,
        address: `${data.address} ${data.detailAddress}`.trim(),
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        description: data.description || '',
        animalYn: data.features.animalYn,
        tumblerYn: data.features.tumblerYn,
        parkingYn: data.features.parkingYn,
        tagIds: data.tags,
        holidays: formattedHolidays,
        storeLinks: data.storeLinks,
        storeImageDeleteIds: storeImageDeleteIds.current,
        ownerPickImageDeleteIds: ownerPickImageDeleteIds.current,
      },
      storeImageFiles: storeImageFiles,
      ownerPickImageFiles: ownerPickImageFiles,
    };

    try {
      await updateStore(formData);
      alert('수정 성공!');
      console.log(data);
      router.back();
    } catch (error) {
      console.error(error);
      alert('수정 실패!');
    }
  };

  return (
    <div>
      <Script
        src={KAKAO_MAP_API_URL}
        strategy="afterInteractive"
        onReady={() => {
          setIsScriptLoaded(true);
        }}
      />
      <ModalHeader
        title="기본 정보 관리하기"
        isSub={true}
        onClose={() => router.back()}
      />
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
                    'w-full rounded-[5px] border p-[10px] pr-10 text-sm font-medium',
                    errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                  )}
                  type="text"
                  placeholder="사업자등록증에 기재된 가게명 입력"
                />
                {field.value && (
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                    onClick={() => field.onChange('')}
                  >
                    <IconXRound className="h-full w-full text-[#CDC8C3]" />
                  </button>
                )}
                {errors.name && (
                  <div className="mt-2">
                    <ValidationError errorMessage={errors.name.message} />
                  </div>
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
                    {value.map((item, index) => (
                      <div key={index} className="relative">
                        <PhotoBox
                          image={
                            <Image
                              width={100}
                              height={100}
                              src={
                                item instanceof File
                                  ? URL.createObjectURL(item)
                                  : item.url
                              }
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

        {/* 추가사진 */}
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
                      {value.map((item, index) => (
                        <div key={index} className="relative flex-shrink-0">
                          <PhotoBox
                            image={
                              item instanceof File ? (
                                <Image
                                  width={100}
                                  height={100}
                                  src={URL.createObjectURL(item)}
                                  alt={`홍보용 가게 사진 ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <Image
                                  width={100}
                                  height={100}
                                  src={item.url}
                                  alt={`홍보용 가게 사진 ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              )
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
              <div>
                <div className="relative">
                  <input
                    {...field}
                    className={cn(
                      'w-full rounded-[5px] border p-[10px] pr-10 text-sm font-medium',
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
                      className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                      onClick={() => field.onChange('')}
                    >
                      <IconXRound className="h-full w-full text-[#CDC8C3]" />
                    </button>
                  )}
                </div>

                {errors.phone && (
                  <div className="mt-2">
                    <ValidationError errorMessage={errors.phone.message} />
                  </div>
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
            <div className="mt-2">
              <ValidationError errorMessage={errors.address.message} />
            </div>
          )}
        </div>

        {/* 스페셜 휴무일 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="holiday" className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-between">
              <TitleLabel
                title="스페셜 휴무일"
                description="휴무가 하루라면 시작일만 선택해 주세요."
              />
              <button
                type="button"
                onClick={handleAddHoliday}
                className="text-primary-60 flex items-center gap-[5px]"
              >
                <div className="h-[13px] w-[13px]">
                  <IconPlusRound className="h-full w-full" />
                </div>
                <div className="text-xs">추가</div>
              </button>
            </div>
          </label>
          {/* 스페셜 휴무일 ui 구현 */}
          <Controller
            name="holidays"
            control={control}
            rules={{
              validate: (holidays) => {
                const todayStr = getTodayStr();

                if (!holidays || holidays.length === 0) return true;

                // 빈 날짜 체크
                if (holidays.some((h) => !h.startDate.trim())) {
                  return '시작일을 입력하거나 삭제해주세요';
                }
                // 빈 사유 체크
                if (holidays.some((h) => !h.reason.trim())) {
                  return '사유를 입력하거나 삭제해주세요';
                }
                if (
                  holidays.some(
                    (h) =>
                      h.startDate.trim() < todayStr ||
                      (h.endDate && h.endDate.trim() < todayStr),
                  )
                ) {
                  return '오늘 날짜 이전은 선택할 수 없습니다';
                }

                if (
                  holidays.some(
                    (h) =>
                      h.endDate && new Date(h.startDate) > new Date(h.endDate),
                  )
                ) {
                  return '시작일이 종료일보다 늦을 수 없습니다';
                }

                return true;
              },
            }}
            render={({ field }) => (
              <div className="space-y-2">
                {field.value && field.value.length > 0 ? (
                  field.value.map((holiday, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="date"
                        value={holiday.startDate}
                        onChange={(e) =>
                          handleHolidayChange(
                            index,
                            'startDate',
                            e.target.value,
                          )
                        }
                        className={cn(
                          'h-10 w-[125px] rounded-[5px] border p-[10px] text-sm font-medium',
                          errors.holidays
                            ? 'border-[#FF3B30]'
                            : 'border-[#A6A6A6]',
                        )}
                        placeholder="날짜"
                      />
                      <input
                        type="date"
                        value={holiday.endDate}
                        onChange={(e) =>
                          handleHolidayChange(index, 'endDate', e.target.value)
                        }
                        className={cn(
                          'h-10 w-[125px] rounded-[5px] border p-[10px] text-sm font-medium',
                          errors.holidays
                            ? 'border-[#FF3B30]'
                            : 'border-[#A6A6A6]',
                        )}
                        placeholder="날짜"
                      />
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={holiday.reason}
                          onChange={(e) =>
                            handleHolidayChange(index, 'reason', e.target.value)
                          }
                          className={cn(
                            'h-10 w-full rounded-[5px] border p-[10px] text-sm font-medium',
                            errors.holidays
                              ? 'border-[#FF3B30]'
                              : 'border-[#A6A6A6]',
                          )}
                          placeholder="사유 입력"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveHoliday(index)}
                          className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                        >
                          <IconMinusRound className="text-neutral-30 h-full w-full" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-gray-400">
                    휴무일을 추가해 주세요
                  </div>
                )}
                {errors.holidays && (
                  <div className="mt-2">
                    <ValidationError errorMessage={errors.holidays.message} />
                  </div>
                )}
              </div>
            )}
          />
        </div>

        {/* SNS 링크 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="storeLink" className="flex flex-col gap-[5px]">
            <div className="flex items-center justify-between">
              <TitleLabel title="SNS 링크" />
              {storeLinks.length < 3 && (
                <button
                  type="button"
                  onClick={handleAddLink}
                  className="text-primary-60 flex items-center gap-[5px]"
                >
                  <div className="h-[13px] w-[13px]">
                    <IconPlusRound className="h-full w-full" />
                  </div>
                  <div className="text-xs">추가</div>
                </button>
              )}
            </div>
            <div className="text-neutral-40 text-xs">최대 3개 추가</div>
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
                        onChange={(e) =>
                          handleLinkChange(index, e.target.value)
                        }
                        className={cn(
                          'w-full rounded-[5px] border p-[10px] pr-10 text-sm font-medium',
                          errors.storeLinks
                            ? 'border-[#FF3B30]'
                            : 'border-[#A6A6A6]',
                        )}
                        placeholder="https://"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(index)}
                        className="absolute right-4 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center"
                      >
                        <IconMinusRound className="text-neutral-30 h-full w-full" />
                      </button>
                    </div>
                  </div>
                ))}
                {errors.storeLinks && (
                  <div className="mt-2">
                    <ValidationError errorMessage={errors.storeLinks.message} />
                  </div>
                )}
              </div>
            )}
          />
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
              validate: (value) =>
                value.length > 0 || '특성 태그를 선택해주세요',
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
                    className={cn(
                      'pointer-events-none w-full rounded-[5px] border bg-[#F0F0F0] p-[10px] pr-10 text-sm font-medium',
                      errors.tags ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                    )}
                    type="text"
                    placeholder="특성 태그 선택"
                    disabled
                  />
                </div>
              )
            }
          />
          {errors.tags && (
            <div className="mt-2">
              <ValidationError errorMessage={errors.tags.message} />
            </div>
          )}
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
        <div className="flex gap-2">
          <div className="w-[40%]">
            <LightOliveButton
              type="button"
              className="font-semibold"
              text="초기화"
              onClick={() => {
                if (storeInfo) {
                  reset(getInitialValues(storeInfo));
                  trigger();
                }
              }}
            />
          </div>
          <OliveButton
            type="submit"
            className="font-semibold"
            text="완료"
            isDisabled={!isValid || !isDirty}
          />
        </div>
      </form>
    </div>
  );
}
