'use client';

import { useForm } from 'react-hook-form';
import { useState, useEffect, useCallback, useRef } from 'react';
import { TextField } from '@repo/design-system/components/inputs/TextField';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { WhiteButton } from '@repo/design-system/components/buttons/FillButtons/White';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import IconCamera from '@repo/design-system/components/icons/IconCamera';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import IconRetry from '@repo/design-system/components/icons/IconRetry';

import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';
import { validateNickname } from './action';

interface SocialLoginUserExtraInfoFormData {
  nickname?: string;
  name: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  profileImage?: File;
}

interface SocialLoginUserExtraInfoFormProps {
  nickname?: string;
}

export default function SocialLoginUserExtraInfoForm({
  nickname,
}: SocialLoginUserExtraInfoFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setLoading] = useState(false);
  const [isNicknameVerified, setNicknameVerified] = useState(
    !!nickname || false,
  );
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [successMessages, setSuccessMessages] = useState({
    nickname: '',
    name: '',
    phone: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
    setValue,
  } = useForm<SocialLoginUserExtraInfoFormData>({
    mode: 'onChange',
    defaultValues: {
      nickname: nickname,
      gender: 'MALE',
    },
  });

  // 전화번호 유효성 검사 정규식 (앞자리 3~4자리 허용)
  const phoneRegex = /^\d{3,4}-\d{4}-\d{4}$/;

  // 성별이 변경될 때마다 기본 이미지 업데이트
  useEffect(() => {
    if (nickname) {
    }
    // 사용자가 업로드한 이미지가 없을 때만 기본 이미지 적용
    if (!profileImageUrl) {
      const gender = watch('gender');
      setProfileImageUrl(
        gender === 'MALE' ? DefaultMaleAvatar.src : DefaultFemaleAvatar.src,
      );
    }
  }, [watch('gender'), profileImageUrl]);

  // 닉네임 유효성 검사 함수
  const validateNicknameFormat = (nickname: string) => {
    // 한글, 영문, 숫자만 허용하는 정규식 (띄어쓰기 제외)
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    // 공백 제거 후 길이 체크 (최대 20자)
    const trimmedNickname = nickname.replace(/\s/g, '');

    if (trimmedNickname.length === 0) {
      return { isValid: false, message: '닉네임을 입력해주세요.' };
    }

    if (trimmedNickname.length > 20) {
      return {
        isValid: false,
        message: '최대 20자까지 입력 가능합니다.',
      };
    }

    if (!nicknameRegex.test(nickname)) {
      return {
        isValid: false,
        message: '한글, 영문, 숫자만 사용 가능합니다.',
      };
    }

    return { isValid: true, message: '' };
  };

  const handleNicknameCheck = async () => {
    const nicknameInput = watch('nickname');

    const validation = validateNicknameFormat(nicknameInput as string);
    if (!validation.isValid) {
      setError('nickname', { message: validation.message });
      setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
      return;
    }

    if (watch('nickname') === nickname) return;

    try {
      setLoading(true);
      const result = await validateNickname(nicknameInput as string);

      if (result.success) {
        setNicknameVerified(true);
        clearErrors('nickname');
        setSuccessMessages((prev) => ({
          ...prev,
          nickname: result.message,
        }));
      } else {
        setNicknameVerified(false);
        setLoading(false);
        setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
        setError('nickname', { message: result.message });
      }
    } catch (error) {
      setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
      setError('nickname', {
        message: '닉네임 검증 중 오류가 발생했습니다.',
      });
    } finally {
      setLoading(false);
    }
  };

  // 이미지 업로드 핸들러 수정
  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // 파일 유효성 검사 (이미지 파일 형식 확인)
      const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('JPG, JPEG, PNG, GIF 형식의 이미지 파일만 업로드 가능합니다.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      // 파일 크기 제한 (5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      try {
        const objectUrl = URL.createObjectURL(file);
        setValue('profileImage', file);
        setProfileImageUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
      } catch (error) {
        console.error('Error creating preview:', error);
        alert('이미지 미리보기 생성에 실패했습니다.');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [setValue],
  );

  // 성별 선택 버튼 핸들러 수정
  const handleGenderChange = (gender: 'MALE' | 'FEMALE') => {
    setValue('gender', gender);

    // 사용자가 업로드한 이미지가 없을 경우에만 기본 이미지 변경
    if (!watch('profileImage')) {
      setProfileImageUrl(
        gender === 'MALE' ? DefaultMaleAvatar.src : DefaultFemaleAvatar.src,
      );
    }
  };

  const onSubmit = async (data: SocialLoginUserExtraInfoFormData) => {
    if (!isNicknameVerified) {
      setError('nickname', { message: '닉네임 중복확인이 필요합니다.' });
      return;
    }

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
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="z-modal fixed top-0 w-full max-w-screen-md bg-[#FAFAFA] py-[14px] text-center font-medium text-[#1D1B20]">
        프로필 입력
      </header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-base mt-[106px] flex h-[calc(100dvh-110px)] flex-col justify-between pb-4"
      >
        <div className="flex flex-col gap-[54px]">
          {/* 닉네임 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">닉네임</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <TextField
                  {...register('nickname', {
                    required: '닉네임을 입력해주세요.',
                    validate: (value) => {
                      const validation = validateNicknameFormat(
                        value as string,
                      );
                      return validation.isValid || validation.message;
                    },
                  })}
                  className="pr-16"
                  placeholder="한글/영문/숫자만 허용, 최대 20자"
                  error={!!errors.nickname}
                  errorMessage={errors.nickname?.message}
                  showReset={!!watch('nickname')}
                  onReset={() => {
                    setValue('nickname', '');
                    setNicknameVerified(false);
                    setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
                  }}
                  successMessage={successMessages.nickname}
                  onChange={(e) => {
                    const withoutSpaces = e.target.value.replace(/\s/g, '');
                    setValue('nickname', withoutSpaces);
                    setNicknameVerified(false);
                    setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
                    clearErrors('nickname');

                    const validation = validateNicknameFormat(withoutSpaces);
                    if (!validation.isValid) {
                      setError('nickname', { message: validation.message });
                    } else {
                      clearErrors('nickname');
                    }
                  }}
                />
                {watch('nickname') !== nickname && watch('nickname') && (
                  <button
                    type="button"
                    className="text-primary-20 absolute right-10 top-1/2 -translate-y-1/2 text-sm"
                    onClick={() => {
                      clearErrors('nickname');
                      setValue('nickname', nickname);
                      setNicknameVerified(false);
                      setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
                    }}
                  >
                    <div className="h-[18px] w-[18px]">
                      <IconRetry className="h-full w-full" />
                    </div>
                  </button>
                )}
              </div>
              <OliveButton
                type="button"
                onClick={handleNicknameCheck}
                isDisabled={
                  !watch('nickname') ||
                  isNicknameVerified ||
                  isLoading ||
                  watch('nickname') === nickname
                }
                className="w-24 text-sm"
                text="중복확인"
              />
            </div>
          </div>

          {/* 이름 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">이름</label>
            <TextField
              {...register('name', { required: '이름을 입력해주세요.' })}
              placeholder="이름을 입력해주세요"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              showReset={!!watch('name')}
              onReset={() => setValue('name', '')}
              onChange={() => {
                clearErrors('name');
              }}
            />
          </div>

          {/* 전화번호 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">전화번호</label>
            <TextField
              {...register('phone', {
                required: '전화번호를 입력해주세요.',
                pattern: {
                  value: phoneRegex,
                  message: '0000-0000-0000 형식으로 입력해주세요.',
                },
              })}
              placeholder="전화번호 (예.0000-0000-0000)"
              error={!!errors.phone}
              errorMessage={errors.phone?.message}
              showReset={!!watch('phone')}
              onReset={() => setValue('phone', '')}
              onChange={() => {
                clearErrors('phone');
              }}
            />
          </div>

          {/* 성별 선택 */}
          <div className="flex flex-col gap-[5px]">
            <label className="text-sm text-[#635F59]">성별</label>
            <div className="flex">
              <button
                type="button"
                onClick={() => handleGenderChange('MALE')}
                className={cn(
                  'flex-1 border-collapse rounded-l-[6px] border py-3 text-sm text-[#393939]',
                  watch('gender') === 'MALE'
                    ? 'border-[#DAA227] bg-[#FFDEA7]'
                    : 'border-[#CDC8C3]',
                )}
              >
                남자
              </button>
              <button
                type="button"
                onClick={() => handleGenderChange('FEMALE')}
                className={cn(
                  'flex-1 border-collapse rounded-r-[6px] border py-3 text-sm text-[#393939]',
                  watch('gender') === 'FEMALE'
                    ? 'border-[#DAA227] bg-[#FFDEA7]'
                    : 'border-[#CDC8C3]',
                )}
              >
                여자
              </button>
            </div>
          </div>

          {/* 프로필 이미지 */}
          {watch('gender') && (
            <div className="flex flex-col gap-[5px]">
              <label className="text-sm text-[#635F59]">
                프로필 이미지 (JPG, JPEG, PNG, GIF 형식의 5MB 이하 파일만 허용)
              </label>
              <div className="flex items-center justify-center">
                <div className="relative flex h-[90px] w-[90px] items-center justify-center rounded-full bg-[#DFDFDF]">
                  {/* 기본 이미지가 아닐 때는 이미지가 원을 꽉 채우도록 설정 */}
                  <div
                    className={cn(
                      'relative overflow-hidden',
                      profileImageUrl !== DefaultMaleAvatar.src &&
                        profileImageUrl !== DefaultFemaleAvatar.src
                        ? 'h-full w-full rounded-full' // 사용자 업로드 이미지는 꽉 채움
                        : 'h-[52px] w-[52px]', // 기본 이미지는 작게 표시
                    )}
                  >
                    {profileImageUrl && (
                      <Image
                        src={profileImageUrl}
                        alt="프로필 이미지"
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw"
                      />
                    )}
                  </div>

                  {/* 카메라 아이콘 (이미지 업로드) */}
                  <label className="absolute bottom-[1px] right-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#2B2B2B]">
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <IconCamera className="h-[18px] w-[18px] text-white" />
                  </label>

                  {/* X 버튼 (이미지 취소) - 사용자 업로드 이미지일 때만 표시 */}
                  {profileImageUrl !== DefaultMaleAvatar.src &&
                    profileImageUrl !== DefaultFemaleAvatar.src && (
                      <button
                        type="button"
                        onClick={() => {
                          // 프로필 이미지 초기화
                          setValue('profileImage', undefined);
                          // 성별에 따른 기본 이미지로 변경
                          setProfileImageUrl(
                            watch('gender') === 'MALE'
                              ? DefaultMaleAvatar.src
                              : DefaultFemaleAvatar.src,
                          );
                          // 파일 입력 요소 초기화
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5252] text-white"
                        aria-label="이미지 삭제"
                      >
                        <IconXRound className="text-neutral-40" />
                      </button>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 이전/완료 버튼 */}
        <HoneyButton
          type="submit"
          className="my-10 text-lg"
          isDisabled={
            !isNicknameVerified ||
            !watch('name') ||
            !watch('phone') ||
            isLoading
          }
          text="다음"
        />
      </form>
    </>
  );
}
