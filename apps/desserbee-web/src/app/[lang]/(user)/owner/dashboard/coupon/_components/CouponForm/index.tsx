'use client';

import type {
  couponCondition,
  EditCouponRequest,
  getCouponResponse,
  RegisterCouponRequest,
} from '@repo/entity/src/store';
import { Controller, useForm, type FieldError } from 'react-hook-form';
import { SelectButton } from '../SelectedButton';
import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { cn } from '@repo/ui/lib/utils';
import { ValidationError } from '../../../../register/_components/ValidationError';
import { useSearchParams } from 'next/navigation';
import {
  createCoupon,
  editCoupon,
} from '@/app/[lang]/(user)/(with-navigation-bar)/map/@sidebar/_components/StoreListContainer/action';
import { ModalHeader } from '../../../../_components/ModalHeader';

interface CouponConditionForm extends couponCondition {
  conditionType: '' | 'AMOUNT' | 'TIME_DAY' | 'EXCLUSIVE' | 'CUSTOM';
}

interface FormInputs extends Omit<RegisterCouponRequest, 'couponCondition'> {
  couponCondition: CouponConditionForm;
  couponId?: number;
}

interface CouponFormProps {
  mode: 'create' | 'edit';
  coupon?: getCouponResponse;
  onClose?: () => void;
  onSuccess?: () => void; //등록 성공시 호출
}

const couponTypeOptions = [
  { value: 'FIXED', label: '정액' },
  { value: 'RATE', label: '정률' },
];

const couponTargetOptions = [
  { value: 'ALL', label: '모든 고객' },
  { value: 'SUBSCRIBED', label: '알림받기한 고객' },
  { value: 'CUSTOM', label: '기타' },
];

const ExposureDateOptions = [
  { value: false, label: '상시 노출' },
  { value: true, label: '일시 노출' },
];

const DayOptions = [
  { value: 'MONDAY', label: '월' },
  { value: 'TUESDAY', label: '화' },
  { value: 'WEDNESDAY', label: '수' },
  { value: 'THURSDAY', label: '목' },
  { value: 'FRIDAY', label: '금' },
  { value: 'SATURDAY', label: '토' },
  { value: 'SUNDAY', label: '일' },
];

const QuantityOptions = [
  { value: false, label: '제한 없이 발행' },
  { value: true, label: '수량 제한' },
];

// 쿠폰 객체를 FormInputs 형태로 변환
function mapCouponToFormInputs(coupon: getCouponResponse): FormInputs {
  return {
    name: coupon.name ?? '',
    hasExposureDate: coupon.hasExposureDate ?? undefined,
    exposureStartAt: coupon.exposureStartAt ?? '',
    exposureEndAt: coupon.exposureEndAt ?? '',
    couponCondition: coupon.condition
      ? {
          ...coupon.condition,
          conditionType: coupon.condition.conditionType as
            | ''
            | 'AMOUNT'
            | 'TIME_DAY'
            | 'EXCLUSIVE'
            | 'CUSTOM',
          minimumPurchaseAmount:
            coupon.condition.minimumPurchaseAmount ?? undefined,
          conditionStartTime: coupon.condition.conditionStartTime ?? undefined,
          conditionEndTime: coupon.condition.conditionEndTime ?? undefined,
          conditionDays: coupon.condition.conditionDays ?? [],
          customConditionText: coupon.condition.customConditionText ?? '',
          exclusiveOnly: coupon.condition.exclusiveOnly ?? false,
        }
      : {
          conditionType: '',
          minimumPurchaseAmount: undefined,
          conditionStartTime: undefined,
          conditionEndTime: undefined,
          conditionDays: [],
          customConditionText: '',
          exclusiveOnly: false,
        },
    hasExpiryDate: coupon.hasExpiryDate ?? undefined,
    expiryDate: coupon.expiryDate ?? '',
    hasQuantity: coupon.hasQuantity ?? undefined,
    quantity: coupon.quantity ?? undefined,
    couponType: {
      type: coupon.couponType?.type ?? '',
      discountType: coupon.couponType?.discountType ?? '',
      discountAmount: coupon.couponType?.discountAmount ?? undefined,
      giftMenuName: coupon.couponType?.giftMenuName ?? '',
    },
    couponTarget: coupon.target ?? '',
    storeUuid: coupon.storeUuid ?? '',
  };
}

export default function CouponForm({
  mode,
  coupon,
  onClose,
  onSuccess,
}: CouponFormProps) {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const couponId = coupon?.couponId;

  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { dirtyFields, errors },
  } = useForm<FormInputs>({
    defaultValues:
      mode === 'edit' && coupon
        ? mapCouponToFormInputs(coupon)
        : {
            name: '',
            hasExposureDate: undefined,
            exposureStartAt: '',
            exposureEndAt: '',
            couponCondition: {
              conditionType: '',
              minimumPurchaseAmount: undefined,
              conditionStartTime: undefined,
              conditionEndTime: undefined,
              conditionDays: [],
              customConditionText: '',
              exclusiveOnly: false,
            },
            hasExpiryDate: undefined,
            expiryDate: '',
            hasQuantity: undefined,
            quantity: undefined,
            couponType: {
              type: '',
              discountType: '',
              discountAmount: undefined,
              giftMenuName: '',
            },
            couponTarget: '',
            storeUuid: storeUuid || '',
          },
    mode: 'onChange',
    shouldUnregister: true,
  });

  // 시간에 초(00) 추가 함수
  const addSecondsToDate = (dateStr: string) => {
    if (!dateStr) return undefined;
    return dateStr.length === 5 ? `${dateStr}:00` : dateStr;
  };

  // dirtyFields에 값이 하나라도 있으면 true
  const isDirty = Object.keys(dirtyFields).length > 0;
  const onSubmit = async (data: FormInputs) => {
    // 쿠폰 사용 조건 중에 1개라도 선택했는지 확인
    try {
      if (!data.couponCondition.conditionType) {
        setError('couponCondition.conditionType', {
          type: 'manual',
          message: '쿠폰 사용 조건을 선택하세요',
        });
        return;
      }

      data.storeUuid = storeUuid ?? '';
      const startTime = data.couponCondition.conditionStartTime ?? '';
      const endTime = data.couponCondition.conditionEndTime ?? '';

      if (data.couponCondition.conditionType === 'EXCLUSIVE') {
        data.couponCondition.exclusiveOnly = false;
      }

      if (startTime && endTime) {
        data.couponCondition.conditionStartTime = addSecondsToDate(startTime);
        data.couponCondition.conditionEndTime = addSecondsToDate(endTime);
      }
      console.log(data);

      if (mode === 'create') {
        await createCoupon(data as RegisterCouponRequest);
        alert('쿠폰 등록이 완료되었습니다.');
        
      } else if (mode === 'edit') {
        data.couponId = couponId;
        await editCoupon(data as EditCouponRequest);
        alert('쿠폰 수정이 완료되었습니다.');
      }

      if (onClose) onClose();
      if (onSuccess) onSuccess();
    } catch (error) {
      if (mode === 'create') {
        console.error('쿠폰 등록 실패:', error);
        alert('쿠폰 등록에 실패했습니다. 다시 시도해주세요.');
      } else if (mode === 'edit') {
        console.error('쿠폰 수정 실패:', error);
        alert('쿠폰 수정에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const discountType = watch('couponType.discountType');
  const hasExposureDate = watch('hasExposureDate');
  const hasExpiryDate = watch('hasExpiryDate');
  const hasQuantity = watch('hasQuantity');
  const couponType = watch('couponType.type');

  return (
    <div className="scrollbar-hide fixed inset-0 z-10 overflow-y-auto bg-white [&::-webkit-scrollbar]:hidden">
      <ModalHeader
        title={mode === 'create' ? '쿠폰 등록하기' : '쿠폰 수정하기'}
        isSub={true}
        onClose={onClose}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex flex-col gap-y-4 p-4"
      >
        <div>
          <div className="flex items-center gap-2">
            <label className="font-medium">쿠폰 이름</label>
            <input
              {...register('name', { required: '쿠폰 이름을 입력하세요' })}
              type="text"
              className={cn(
                'flex-1 rounded-[5px] border p-2 text-sm font-medium',
                errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
              )}
            />
          </div>
          {errors.name && (
            <div className="mt-2">
              <ValidationError errorMessage={errors.name.message} />
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            <label className="font-medium">쿠폰 유형</label>
            <select
              {...register('couponType.type', {
                required: '종류를 선택해주세요',
              })}
            >
              <option value="">종류 선택</option>
              <option value="DISCOUNT">할인 쿠폰</option>
              <option value="GIFT">증정 쿠폰</option>
            </select>
          </div>
          {errors.couponType?.type && (
            <div className="mt-2">
              <ValidationError
                errorMessage={(errors.couponType.type as FieldError).message}
              />
            </div>
          )}
        </div>
        {watch('couponType.type') === 'GIFT' && (
          <>
            <input
              {...register('couponType.giftMenuName', {
                validate: (value, formValues) => {
                  if (formValues.couponType?.type === 'GIFT' && !value) {
                    return '증정 메뉴명을 입력해주세요';
                  }
                  return true;
                },
              })}
              placeholder="증정 메뉴명"
              className={cn(
                'w-full rounded-[5px] border p-2 text-sm font-medium',
                errors.couponType?.giftMenuName
                  ? 'border-[#FF3B30]'
                  : 'border-[#A6A6A6]',
              )}
            />
            {errors.couponType?.giftMenuName && (
              <div className="mt-2">
                <ValidationError
                  errorMessage={errors.couponType.giftMenuName.message}
                />
              </div>
            )}
          </>
        )}

        {couponType === 'DISCOUNT' && (
          // 쿠폰 유형이 할인쿠폰일때만
          <div className="flex flex-col gap-2">
            <label className="font-medium">할인 유형</label>
            <Controller
              name="couponType.discountType"
              control={control}
              rules={{ required: '할인 유형을 선택하세요' }}
              render={({ field }) => (
                <SelectButton
                  value={field.value ?? ''}
                  options={couponTypeOptions}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.couponType?.discountType && (
              <div className="mt-2">
                <ValidationError
                  errorMessage={errors.couponType?.discountType.message}
                />
              </div>
            )}
            {/* 할인율/금액 입력 */}
            {discountType && (
              <div>
                <div className="mt-2 flex items-center gap-2">
                  <label>할인율 입력</label>
                  <input
                    {...register('couponType.discountAmount', {
                      required: '할인율을 입력해주세요',
                    })}
                    placeholder={
                      discountType === 'RATE'
                        ? '예: 10 (10% 할인)'
                        : '예: 3000 (3,000원 할인)'
                    }
                    className={cn(
                      'flex-1 rounded-[5px] border p-2 text-sm font-medium',
                      errors.couponType?.discountAmount
                        ? 'border-[#FF3B30]'
                        : 'border-[#A6A6A6]',
                    )}
                  />
                </div>
                {errors.couponType?.discountAmount && (
                  <div className="mt-2">
                    <ValidationError
                      errorMessage={errors.couponType?.discountAmount.message}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="font-medium">쿠폰 발행 대상</label>
          <Controller
            name="couponTarget"
            control={control}
            rules={{ required: '쿠폰 발행 대상을 선택하세요' }}
            render={({ field }) => (
              <SelectButton
                value={field.value ?? ''}
                options={couponTargetOptions}
                onChange={field.onChange}
              />
            )}
          />
          {errors.couponTarget && (
            <div className="mt-2">
              <ValidationError errorMessage={errors.couponTarget.message} />
            </div>
          )}
        </div>

        <>
          <div className="flex flex-col gap-2">
            <label className="font-medium">쿠폰 노출 기간</label>
            <Controller
              name="hasExposureDate"
              control={control}
              rules={{
                validate: (v) =>
                  v !== undefined || '쿠폰 노출 기간을 선택하세요',
              }}
              render={({ field }) => (
                <SelectButton
                  value={field.value}
                  options={ExposureDateOptions}
                  onChange={(v) => {
                    field.onChange(v === true || v === 'true');
                  }}
                />
              )}
            />
            {errors.hasExposureDate && (
              <div className="mt-2">
                <ValidationError
                  errorMessage={errors.hasExposureDate.message}
                />
              </div>
            )}
            {hasExposureDate === true && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-[#635F59]">시작 날짜</label>
                  <input
                    {...register('exposureStartAt', {
                      validate: (value) => {
                        if (!hasExposureDate) return true;

                        // 1. 값이 있는지 확인
                        if (!value) return '시작 날짜를 선택하세요';

                        // 2. 오늘 날짜보다 이전인지 확인
                        const today = new Date().toISOString().split('T')[0];
                        if (value < today) {
                          return '시작 날짜는 오늘 이후로 설정해주세요';
                        }

                        return true;
                      },
                    })}
                    type="datetime-local"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-[#635F59]">종료 날짜</label>
                  <input
                    {...register('exposureEndAt', {
                      validate: (value, formValues) => {
                        if (!hasExposureDate) return true;

                        // 1. 값이 있는지 확인
                        if (!value) return '종료 날짜를 선택하세요';

                        // 2. 시작 날짜보다 이전인지 확인
                        const startDate = formValues.exposureStartAt;
                        if (startDate && value < startDate) {
                          return '종료 날짜는 시작 날짜보다 이후여야 합니다';
                        }

                        return true;
                      },
                    })}
                    type="datetime-local"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            {errors.exposureStartAt && (
              <div>
                <ValidationError
                  errorMessage={errors.exposureStartAt.message}
                />
              </div>
            )}
            {errors.exposureEndAt && (
              <div>
                <ValidationError errorMessage={errors.exposureEndAt.message} />
              </div>
            )}
          </div>
        </>

        <div className="flex flex-col gap-2">
          <label className="font-medium">쿠폰 사용 조건</label>
          <div className="flex flex-col gap-1">
            <label>
              <input
                type="radio"
                {...register('couponCondition.conditionType')}
                className="mr-1"
                value="AMOUNT"
              />
              결제 금액에 따라 사용 가능함
            </label>
            {watch('couponCondition.conditionType') === 'AMOUNT' && (
              <>
                <input
                  {...register('couponCondition.minimumPurchaseAmount', {
                    validate: (value, formValues) => {
                      if (
                        formValues.couponCondition?.conditionType === 'AMOUNT'
                      ) {
                        if (!value) return '최소 결제 금액을 입력해주세요';
                        if (Number(value) <= 0) return '0원 이상 입력해주세요';
                      }
                      return true;
                    },
                  })}
                  placeholder="최소 결제 금액"
                  type="number"
                  className={cn(
                    'mb-2 flex-1 rounded-[5px] border p-2 text-sm font-medium',
                    errors.couponCondition?.minimumPurchaseAmount
                      ? 'border-[#FF3B30]'
                      : 'border-[#A6A6A6]',
                  )}
                />
                {errors.couponCondition?.minimumPurchaseAmount && (
                  <div>
                    <ValidationError
                      errorMessage={
                        errors.couponCondition?.minimumPurchaseAmount.message
                      }
                    />
                  </div>
                )}
              </>
            )}

            <label>
              <input
                type="radio"
                {...register('couponCondition.conditionType')}
                value="TIME_DAY"
                className="mr-1"
              />
              요일 / 시간 선택적으로 사용 가능
            </label>
            {watch('couponCondition.conditionType') === 'TIME_DAY' && (
              <div>
                <Controller
                  name="couponCondition.conditionDays"
                  control={control}
                  rules={{
                    validate: (value, formValues) => {
                      // 체크박스가 활성화된 경우만 검증
                      if (
                        formValues.couponCondition?.conditionType === 'TIME_DAY'
                      ) {
                        return (
                          (value?.length ?? 0) > 0 ||
                          '최소 1개 이상 선택해야 합니다'
                        );
                      }
                      return true;
                    },
                  }}
                  render={({ field }) => (
                    <SelectButton
                      value={field.value ?? []}
                      options={DayOptions}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.couponCondition?.conditionDays && (
                  <div>
                    <ValidationError
                      errorMessage={
                        errors.couponCondition.conditionDays.message
                      }
                    />
                  </div>
                )}

                <div className="mb-2 flex w-full gap-2">
                  <div className="flex items-center gap-2">
                    <label className="text-[#635F59]">시작 시간</label>
                    <input
                      {...register('couponCondition.conditionStartTime', {
                        required: '시작 시간을 입력하세요',
                        validate: (value, formValues) => {
                          if (
                            formValues.couponCondition?.conditionType !==
                            'TIME_DAY'
                          )
                            return true;
                          if (!value) return '시작 시간을 입력하세요';

                          // 종료 시간과 비교
                          const endTime =
                            formValues.couponCondition?.conditionEndTime;
                          if (endTime && value >= endTime) {
                            return '시작 시간은 종료 시간보다 이전이어야 합니다';
                          }

                          return true;
                        },
                      })}
                      type="time"
                      className="min-w-0 flex-1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-[#635F59]">종료 시간</label>
                    <input
                      {...register('couponCondition.conditionEndTime', {
                        required: '종료 시간을 입력하세요',
                        validate: (value, formValues) => {
                          if (
                            formValues.couponCondition?.conditionType !==
                            'TIME_DAY'
                          )
                            return true;
                          if (!value) return '종료 시간을 입력하세요';

                          const startTime =
                            formValues.couponCondition?.conditionStartTime;
                          if (startTime && value <= startTime) {
                            return '종료 시간은 시작 시간보다 이후여야 합니다';
                          }

                          return true;
                        },
                      })}
                      type="time"
                      className="min-w-0 flex-1"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {errors.couponCondition?.conditionStartTime && (
                    <div>
                      <ValidationError
                        errorMessage={
                          errors.couponCondition.conditionStartTime.message
                        }
                      />
                    </div>
                  )}
                  {errors.couponCondition?.conditionEndTime && (
                    <div>
                      <ValidationError
                        errorMessage={
                          errors.couponCondition.conditionEndTime.message
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <label>
              <input
                type="radio"
                {...register('couponCondition.conditionType')}
                className="mr-1"
                value="EXCLUSIVE"
              />
              쿠폰 단독 사용 불가능(다른 메뉴 주문시 사용 가능)
            </label>

            <label>
              <input
                type="radio"
                {...register('couponCondition.conditionType')}
                className="mr-1"
                value="CUSTOM"
              />
              직접 조건 입력
            </label>
            {watch('couponCondition.conditionType') === 'CUSTOM' && (
              <>
                <input
                  {...register('couponCondition.customConditionText', {
                    required:
                      watch('couponCondition.conditionType') === 'CUSTOM'
                        ? '조건을 입력해주세요'
                        : false,
                    validate: (value) => {
                      // 공백 입력까지 막고 싶은 경우
                      if (
                        watch('couponCondition.conditionType') === 'CUSTOM' &&
                        !value?.trim()
                      ) {
                        return '조건을 입력해주세요';
                      }
                      return true;
                    },
                  })}
                  placeholder="조건을 입력해주세요"
                  type="text"
                  className={cn(
                    'flex-1 rounded-[5px] border p-2 text-sm font-medium',
                    errors.couponCondition?.customConditionText
                      ? 'border-[#FF3B30]'
                      : 'border-[#A6A6A6]',
                  )}
                />
                {errors.couponCondition?.customConditionText && (
                  <div className="mt-2">
                    <ValidationError
                      errorMessage={
                        errors.couponCondition.customConditionText.message
                      }
                    />
                  </div>
                )}
              </>
            )}
          </div>
          {errors.couponCondition?.conditionType && (
            <ValidationError
              errorMessage={errors.couponCondition.conditionType.message}
            />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">쿠폰 유효 기간</label>
          <Controller
            name="hasExpiryDate"
            control={control}
            rules={{
              validate: (v) => v !== undefined || '쿠폰 유효 기간을 선택하세요',
            }}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <label>
                  <input
                    type="radio"
                    value="false"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                    className="mr-1"
                  />
                  없음
                </label>
                <label>
                  <input
                    type="radio"
                    value="true"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                    className="mr-1"
                  />
                  있음
                </label>
              </div>
            )}
          />
          {errors.hasExpiryDate && (
            <div className="mt-2">
              <ValidationError errorMessage={errors.hasExpiryDate.message} />
            </div>
          )}

          {hasExpiryDate === true && (
            <>
              <div className="flex items-center gap-2">
                <label>유효기간</label>
                <input
                  type="datetime-local"
                  {...register('expiryDate', {
                    validate: (value) => {
                      if (!hasExpiryDate) return true;

                      if (!value) return '유효 기간을 선택하세요';

                      const today = new Date();
                      const inputDate = new Date(value);

                      // 오늘 날짜의 00:00:00와 비교
                      const todayStart = new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate(),
                      );

                      if (inputDate < todayStart) {
                        return '유효기간은 현재 시각 이후로 설정해주세요';
                      }

                      return true;
                    },
                  })}
                />
              </div>
              {errors.expiryDate && (
                <div className="mt-2">
                  <ValidationError errorMessage={errors.expiryDate.message} />
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">쿠폰 발행 제한</label>
          <Controller
            name="hasQuantity"
            control={control}
            rules={{
              validate: (v) =>
                v !== undefined || '쿠폰 발행 제한 여부를 선택하세요',
            }}
            render={({ field }) => (
              <SelectButton
                value={field.value}
                options={QuantityOptions}
                onChange={field.onChange}
              />
            )}
          />
          {errors.hasQuantity && (
            <div className="mt-2">
              <ValidationError errorMessage={errors.hasQuantity.message} />
            </div>
          )}

          {hasQuantity === true && (
            <>
              <input
                {...register('quantity', {
                  required:
                    watch('hasQuantity') === true
                      ? '총 몇 장으로 제한할지 입력해주세요'
                      : false,
                  valueAsNumber: true,
                  validate: (value) => {
                    if (watch('hasQuantity') === true) {
                      if (value === undefined || value === null) {
                        return '총 몇 장으로 제한할지 입력해주세요';
                      }
                      if (Number(value) < 1) {
                        return '1 이상의 값을 입력하세요';
                      }
                    }
                    return true;
                  },
                })}
                type="number"
                placeholder="총 몇 장으로 제한할지 입력해주세요"
                className={cn(
                  'mb-2 flex-1 rounded-[5px] border p-2 text-sm font-medium',
                  errors.quantity ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
                )}
              />
              {errors.quantity && (
                <ValidationError errorMessage={errors.quantity.message} />
              )}
            </>
          )}
        </div>

        <div className="flex gap-2">
          <div className="w-[40%]">
            <LightOliveButton
              type="button"
              className="font-semibold"
              text="초기화"
              onClick={() => {
                if (mode === 'edit' && coupon) {
                  reset(mapCouponToFormInputs(coupon));
                } else {
                  reset();
                }
              }}
            />
          </div>
          <OliveButton
            type="submit"
            className="font-semibold"
            text={mode === 'create' ? '완료' : '수정하기'}
            isDisabled={!isDirty}
          />
        </div>
      </form>
    </div>
  );
}
