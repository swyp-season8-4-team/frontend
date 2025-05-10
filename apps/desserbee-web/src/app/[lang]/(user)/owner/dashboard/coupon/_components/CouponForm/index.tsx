'use client';

import type { RegisterCoupon } from '@repo/entity/src/store';
import { Controller, useForm } from 'react-hook-form';
import { SelectButton } from '../SelectedButton';
import { useState } from 'react';
import { LightOliveButton } from '@repo/design-system/components/buttons/FillButtons/LightOlive';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { cn } from '@repo/ui/lib/utils';
import { ValidationError } from '../../../../register/_components/ValidationError';

export default function CouponForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isValid, isDirty, errors },
  } = useForm<RegisterCoupon>({
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
        exclusiveOnly: undefined,
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
      storeUuid: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterCoupon) => {
    console.log(data);
  };

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

  const discountType = watch('couponType.discountType');
  const hasExposureDate = watch('hasExposureDate');
  const hasExpiryDate = watch('hasExpiryDate');
  const hasQuantity = watch('hasQuantity');

  // 쿠폰 사용 조건 체크 박스
  const [amount, setAmount] = useState(false);
  const [day, setDay] = useState(false);
  const [time, setTime] = useState(false);
  const [self, setSelf] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col gap-y-6 p-4"
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
        {errors.couponType?.discountType&& (
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

      <div className="flex gap-2">
        <label className="font-medium">증정 쿠폰</label>
        <select {...register('couponType.type')}>
          <option value="">종류 선택</option>
          <option value="DISCOUNT">할인 쿠폰</option>
          <option value="GIFT">증정 쿠폰</option>
        </select>
      </div>
      {watch('couponType.type') === 'GIFT' && (
        <div>
          <input
            {...register('couponType.giftMenuName', { required: true })}
            placeholder="증정 메뉴명"
            className={cn(
              'w-full rounded-[5px] border p-2 text-sm font-medium',
              errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
            )}
          />
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
      </div>

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
        {hasExposureDate === true && (
          <div className="flex w-full gap-2">
            <div className="flex items-center gap-2">
              <label className="text-[#635F59]">시작 날짜</label>
              <input
                {...register('exposureStartAt', {
                  validate: (value) =>
                    hasExposureDate !== true ||
                    !!value ||
                    '시작 날짜를 선택하세요',
                })}
                type="date"
                className="min-w-0 flex-1"
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[#635F59]">종료 날짜</label>
              <input
                {...register('exposureEndAt', {
                  validate: (value) =>
                    hasExposureDate !== true ||
                    !!value ||
                    '종료 날짜를 선택하세요',
                })}
                type="date"
                className="min-w-0 flex-1"
              />
            </div>
          </div>
        )}
        {errors.hasExposureDate && (
          <div className="mt-2">
            <ValidationError errorMessage={errors.hasExposureDate.message} />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">쿠폰 사용 조건</label>
        <div className="flex flex-col gap-1">
          <label>
            <input
              type="checkbox"
              checked={amount}
              onChange={(e) => setAmount(e.target.checked)}
              className="mr-1"
            />
            결제 금액에 따라 사용 가능함
          </label>
          {amount && (
            <input
              {...register('couponCondition.minimumPurchaseAmount', {
                required: true,
              })}
              placeholder="최소 결제 금액"
              type="number"
              className={cn(
                'mb-2 flex-1 rounded-[5px] border p-2 text-sm font-medium',
                errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
              )}
            />
          )}
          <label>
            <input
              type="checkbox"
              checked={day}
              onChange={(e) => setDay(e.target.checked)}
              className="mr-1"
            />
            요일 선택적으로 사용 가능
          </label>
          {day && (
            <Controller
              name="couponCondition.conditionDays"
              control={control}
              rules={{ required: '요일을 선택하세요' }}
              render={({ field }) => (
                <SelectButton
                  value={field.value ?? []}
                  options={DayOptions}
                  onChange={field.onChange}
                />
              )}
            />
          )}

          <label>
            <input
              type="checkbox"
              checked={time}
              onChange={(e) => setTime(e.target.checked)}
              className="mr-1"
            />
            시간 선택적으로 사용 가능
          </label>
          {time && (
            <div className="mb-2 flex w-full gap-2">
              <div className="flex items-center gap-2">
                <label className="text-[#635F59]">시작 시간</label>
                <input
                  {...register('couponCondition.conditionStartTime', {
                    required: true,
                  })}
                  type="time"
                  step="1" // 초 단위까지 입력받으려면 추가
                  className="min-w-0 flex-1"
                />
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[#635F59]">종료 시간</label>
                <input
                  {...register('couponCondition.conditionEndTime', {
                    required: true,
                  })}
                  type="time"
                  step="1"
                  className="min-w-0 flex-1"
                />
              </div>
            </div>
          )}

          <label>
            <input
              type="checkbox"
              {...register('couponCondition.exclusiveOnly', {
                required: true,
              })}
              className="mr-1"
            />
            쿠폰 단독 사용 불가능(다른 메뉴 주문시 사용 가능)
          </label>

          <label>
            <input
              type="checkbox"
              checked={self}
              onChange={(e) => setSelf(e.target.checked)}
              className="mr-1"
            />
            직접 조건 입력
          </label>
          {self && (
            <input
              {...register('couponCondition.customConditionText', {
                required: true,
              })}
              placeholder="조건을 입력해주세요"
              type="text"
              className={cn(
                'flex-1 rounded-[5px] border p-2 text-sm font-medium',
                errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
              )}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">쿠폰 유효 기간</label>
        <Controller
          name="hasExpiryDate"
          control={control}
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
        {hasExpiryDate === true && (
          <input
            type="text"
            {...register('expiryDate', {
              required: true,
              pattern: {
                value: /^\d{4}\.\d{2}\.\d{2}$/,
                message: 'YYYY.MM.DD 형식으로 입력해주세요',
              },
            })}
            placeholder="YYYY.MM.DD(유효기간을 입력해주세요)"
            className={cn(
              'flex-1 rounded-[5px] border p-2 text-sm font-medium',
              errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
            )}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-medium">쿠폰 발행 제한</label>
        <Controller
          name="hasQuantity"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <SelectButton
              value={field.value}
              options={QuantityOptions}
              onChange={field.onChange}
            />
          )}
        />
        {hasQuantity === true && (
          <input
            {...register('quantity', {
              required: true,
              valueAsNumber: true,
              min: { value: 1, message: '1 이상의 값을 입력하세요' },
            })}
            type="number"
            placeholder="총 몇 장으로 제한할지 입력해주세요"
            className={cn(
              'mb-2 flex-1 rounded-[5px] border p-2 text-sm font-medium',
              errors.name ? 'border-[#FF3B30]' : 'border-[#A6A6A6]',
            )}
          />
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
