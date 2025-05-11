'use client';

import type {
  couponCondition,
  RegisterCouponRequest,
} from '@repo/entity/src/store';
import { Controller, useForm, type FieldError } from 'react-hook-form';
import { SelectButton } from '../SelectedButton';
import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { cn } from '@repo/ui/lib/utils';
import { ValidationError } from '../../../../register/_components/ValidationError';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface CouponConditionForm extends couponCondition {
  conditionType: ''|'AMOUNT' | 'TIME_DAY' | 'EXCLUSIVE' | 'CUSTOM';
}

interface FormInputs extends Omit<RegisterCouponRequest, 'couponCondition'> {
  couponCondition: CouponConditionForm;
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

export default function CouponForm() {
  const searchParams = useSearchParams();
  const storeUuid = searchParams.get('storeUuid');
  const {
    register,
    control,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<FormInputs>({
    defaultValues: {
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
    mode: 'onSubmit',
    shouldUnregister: true,
  });

  const onSubmit = (data: FormInputs) => {
    // 쿠폰 사용 조건 중에 1개라도 선택했는지 확인
    if (!data.couponCondition.conditionType) {
      setError('couponCondition.conditionType', {
        type: 'manual',
        message: '쿠폰 사용 조건을 선택하세요',
      });
      return;
    }
    console.log(data);
  };

  const discountType = watch('couponType.discountType');
  const hasExposureDate = watch('hasExposureDate');
  const hasExpiryDate = watch('hasExpiryDate');
  const hasQuantity = watch('hasQuantity');

  return (
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

      <div className="flex flex-col gap-2">
        <label className="font-medium">쿠폰 종류</label>
        <Controller
          name="couponType.discountType"
          control={control}
          rules={{ required: '쿠폰 종류를 선택하세요' }}
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

      <div>
        <div className="flex gap-2">
          <label className="font-medium">증정 쿠폰</label>
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
              validate: (v) => v !== undefined || '쿠폰 노출 기간을 선택하세요',
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
              <ValidationError errorMessage={errors.hasExposureDate.message} />
            </div>
          )}
          {hasExposureDate === true && (
            <div className="flex w-full gap-2">
              <div className="flex items-center gap-2">
                <label className="text-[#635F59]">시작 날짜</label>
                <input
                  {...register('exposureStartAt', {
                    validate: (value, formValues) => {
                      if (!hasExposureDate) return true;

                      // 1. 값이 있는지 확인
                      if (!value) return '시작 날짜를 선택하세요';

                      // 2. 오늘 날짜보다 이전인지 확인
                      const today = new Date().toISOString().split('T')[0];
                      if (value < today) {
                        return '시작 날짜는 오늘 이후로 설정해주세요';
                      }

                      // 3. 종료 날짜보다 이후인지 확인
                      const endDate = formValues.exposureEndAt;
                      if (endDate && value > endDate) {
                        return '시작 날짜는 종료 날짜보다 이전이어야 합니다';
                      }

                      return true;
                    },
                  })}
                  type="date"
                  className="min-w-0 flex-1"
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
                  type="date"
                  className="min-w-0 flex-1"
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          {errors.exposureStartAt && (
            <div>
              <ValidationError errorMessage={errors.exposureStartAt.message} />
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
                    if (formValues.couponCondition?.conditionType==='AMOUNT') {
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
                    if (formValues.couponCondition?.conditionType==='TIME_DAY') {
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
                    errorMessage={errors.couponCondition.conditionDays.message}
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
                        if (formValues.couponCondition?.conditionType !== 'TIME_DAY') 
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
                        if (formValues.couponCondition?.conditionType !== 'TIME_DAY') 
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
            <input
              type="text"
              {...register('expiryDate', {
                validate: (value) => {
                  if (hasExpiryDate === true) {
                    if (!value) return '유효기간을 입력해주세요';
                    // 형식 확인
                    if (!/^\d{4}\.\d{2}\.\d{2}$/.test(value)) {
                      return 'YYYY.MM.DD 형식으로 입력해주세요';
                    }
                    // 실제 날짜 유효성 체크
                    const [year, month, day] = value.split('.').map(Number);
                    const date = new Date(year, month - 1, day);

                    if (
                      date.getFullYear() !== year ||
                      date.getMonth() !== month - 1 ||
                      date.getDate() !== day
                    ) {
                      return '유효한 날짜를 입력해주세요';
                    }
                    // 현재 날짜와 비교
                    const today = new Date();
                    today.setHours(0, 0, 0, 0); // 시간 제거
                    date.setHours(0, 0, 0, 0);
                    if (date < today) {
                      return '유효기간은 오늘 이후로 설정해주세요';
                    }
                  }
                  return true;
                },
              })}
              placeholder="YYYY.MM.DD(유효기간을 입력해주세요)"
              className={cn(
                'flex-1 rounded-[5px] border p-2 text-sm font-medium',
                errors.expiryDate ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
              )}
            />
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
              reset();
            }}
          />
        </div>
        <OliveButton
          type="submit"
          className="font-semibold"
          text="완료"
          // isDisabled={!isValid || !isDirty}
        />
      </div>
    </form>
  );
}
