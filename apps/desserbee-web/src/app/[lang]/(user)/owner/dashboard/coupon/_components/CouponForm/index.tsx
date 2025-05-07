'use client';

import type { RegisterCoupon } from '@repo/entity/src/store';
import { Controller, useForm } from 'react-hook-form';
import { SelectButton } from '../SelectedButton';

export default function CouponForm() {
  const { register, control, handleSubmit, watch } = useForm<RegisterCoupon>({
    defaultValues: {
      name: '',
      hasExposureDate: false,
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
      hasExpiryDate: false,
      expiryDate: '',
      hasQuantity: false,
      quantity: 0,
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

  const couponType = watch('couponType.discountType');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>쿠폰 이름</label>
        <input {...register('name', { required: true })} />
      </div>

      <div>
        <label>쿠폰 종류</label>
        <Controller
          name="couponType.discountType"
          control={control}
          rules={{ required: '할인 방식을 선택하세요' }}
          render={({ field }) => (
            <SelectButton
              value={field.value ?? ''}
              options={couponTypeOptions}
              onChange={field.onChange}
            />
          )}
        />
        {/* 할인율/금액 입력 */}
        {couponType && (
          <div>
            <label>할인율 입력</label>
            <input
              {...register('couponType.discountAmount', { required: true })}
              placeholder={
                couponType === 'RATE'
                  ? '예: 10 (10% 할인)'
                  : '예: 3000 (3,000원 할인)'
              }
            />
          </div>
        )}
      </div>
    </form>
  );
}
