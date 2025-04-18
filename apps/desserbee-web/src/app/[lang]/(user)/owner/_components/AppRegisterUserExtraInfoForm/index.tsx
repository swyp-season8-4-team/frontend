'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { TextField } from '@repo/design-system/components/inputs/TextField';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { useRouter } from 'next/navigation';

import { updateUserInfo } from './action';
import type { User } from '@repo/entity/src/user';
import { HTTPError } from '@repo/api/src/error';

interface AppRegisterUserExtraInfoFormData {
  name: string;
  phone: string;
}

interface AppRegisterUserExtraInfoFormProps {
  user: User;
}

export default function AppRegisterUserExtraInfoForm({
  user,
}: AppRegisterUserExtraInfoFormProps) {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [validationState, setValidationState] = useState({
    name: false,
    phone: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<AppRegisterUserExtraInfoFormData>({
    mode: 'onChange',
  });

  const phone = watch('phone');

  useEffect(() => {
    if (phone) {
      const validation = validatePhoneFormat(phone);
      if (!validation.isValid) {
        setError('phone', { message: validation.message });
      } else {
        clearErrors('phone');
      }
      setValidationState((prev) => ({
        ...prev,
        phone: validation.isValid,
      }));
    } else {
      setValidationState((prev) => ({
        ...prev,
        phone: false,
      }));
    }
  }, [phone, setError, clearErrors]);

  // 전화번호 유효성 검사 정규식 (앞자리 3~4자리 허용)
  const phoneRegex = /^\d{3,4}-\d{4}-\d{4}$/;

  // 이름 유효성 검사 함수 추가
  const validateNameFormat = (name: string) => {
    if (!name) {
      return { isValid: false, message: '이름을 입력해주세요.' };
    }

    if (name.length < 2) {
      return { isValid: false, message: '이름은 최소 2자 이상이어야 합니다.' };
    }

    if (name.length > 50) {
      return {
        isValid: false,
        message: '이름은 최대 50자까지 입력 가능합니다.',
      };
    }

    if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
      return {
        isValid: false,
        message: '이름에는 완성된 한글, 영문만 입력 가능합니다.',
      };
    }

    return { isValid: true, message: '' };
  };

  // 전화번호 유효성 검사 함수 추가
  const validatePhoneFormat = (phone: string) => {
    if (!phone) {
      return { isValid: false, message: '전화번호를 입력해주세요.' };
    }
    if (!phoneRegex.test(phone)) {
      return {
        isValid: false,
        message: '0000-0000-0000 형식으로 입력해주세요.',
      };
    }
    return { isValid: true, message: '' };
  };

  const onSubmit = async (data: AppRegisterUserExtraInfoFormData) => {
    if (data.name === '') {
      setError('name', { message: '이름을 입력해주세요.' });
      return;
    }

    if (data.phone === '') {
      setError('phone', { message: '전화번호를 입력해주세요.' });
      return;
    }

    try {
      setLoading(true);

      await updateUserInfo({ user, name: data.name, phoneNumber: data.phone });
      router.refresh();
    } catch (error) {
      if (error instanceof HTTPError) {
        console.log(error.data);
      }
      console.log(error);
      alert(`정보 등록 실패: 등록 중 오류가 발생했습니다.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="z-modal fixed top-0 w-full max-w-screen-md bg-[#FAFAFA] py-[14px] text-center font-medium text-[#1D1B20]">
        기본 정보
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-base mt-[106px] flex h-[calc(100dvh-110px)] flex-col justify-between pb-4"
      >
        <div className="flex flex-col gap-[54px]">
          {/* 이름 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">이름</label>
            <TextField
              {...register('name', {
                required: '이름을 입력해주세요.',
                validate: (value) => {
                  const validation = validateNameFormat(value);
                  setValidationState((prev) => ({
                    ...prev,
                    name: validation.isValid,
                  }));
                  return validation.isValid || validation.message;
                },
              })}
              placeholder="이름을 입력해주세요"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              showReset={!!watch('name')}
              onReset={() => {
                setValue('name', '');
                setValidationState((prev) => ({
                  ...prev,
                  name: false,
                }));
              }}
              onChange={(e) => {
                clearErrors('name');
                const validation = validateNameFormat(e.target.value);
                setValidationState((prev) => ({
                  ...prev,
                  name: validation.isValid,
                }));
                if (!validation.isValid) {
                  setError('name', { message: validation.message });
                }
              }}
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">전화번호</label>
            <TextField
              {...register('phone')}
              placeholder="전화번호 (예.0000-0000-0000)"
              error={!!errors.phone}
              errorMessage={errors.phone?.message}
              showReset={!!watch('phone')}
              onReset={() => {
                setValue('phone', '');
                clearErrors('phone');
                setValidationState((prev) => ({
                  ...prev,
                  phone: false,
                }));
              }}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9-]/g, '');
                setValue('phone', value);
              }}
            />
          </div>
        </div>

        {/* 완료 버튼 */}
        <HoneyButton
          type="submit"
          className="my-10 text-lg"
          isDisabled={
            !validationState.name || !validationState.phone || isLoading
          }
          text="완료"
        />
      </form>
    </>
  );
}
