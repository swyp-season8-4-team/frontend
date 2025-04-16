'use client';

import { useForm } from 'react-hook-form';
import { SignUpStep } from '@repo/usecase/src/authService';
import { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { SignUpContext } from '../../_contexts/SignUpContext';
import { TextField } from '@repo/design-system/components/inputs/TextField';
import { OliveButton } from '@repo/design-system/components/buttons/FillButtons/Olive';
import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
import { WhiteButton } from '@repo/design-system/components/buttons/FillButtons/White';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';
import Image from 'next/image';
import { cn } from '@repo/ui/lib/utils';
import UserService from '@repo/usecase/src/userService';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import IconCamera from '@repo/design-system/components/icons/IconCamera';
import IconXRound from '@repo/design-system/components/icons/IconXRound';
import { validateNickname } from './action';

import DefaultMaleAvatar from '@/assets/images/image-default-male-profile.png';
import DefaultFemaleAvatar from '@/assets/images/image-default-female-profile.png';

interface StepTwoFormData {
  nickname: string;
  name: string;
  phone: string;
  gender: 'MALE' | 'FEMALE';
  profileImage?: File;
}

interface Props {
  updateStep: (step: SignUpStep) => void;
}

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

export default function SignUpStepTwo({ updateStep }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    updateNickname,
    updateName,
    updatePhoneNumber,
    updateGender,
    updateProfileImage,
  } = useContext(SignUpContext);
  const [isLoading, setLoading] = useState(false);
  const [isNicknameVerified, setNicknameVerified] = useState(false);
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
    setValue,
  } = useForm<StepTwoFormData>({
    mode: 'onChange',
    defaultValues: {
      gender: 'MALE',
    },
  });

  // 전화번호 유효성 검사 정규식 (앞자리 3~4자리 허용)
  const phoneRegex = /^\d{3,4}-\d{4}-\d{4}$/;

  // 성별이 변경될 때마다 기본 이미지 업데이트
  useEffect(() => {
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
    const nickname = watch('nickname');

    // 클라이언트 측 유효성 검사
    const validation = validateNicknameFormat(nickname);
    if (!validation.isValid) {
      setError('nickname', { message: validation.message });
      setSuccessMessages((prev) => ({ ...prev, nickname: '' }));
      return;
    }

    try {
      setLoading(true);
      const result = await validateNickname(nickname);

      if (result.success) {
        setNicknameVerified(true);
        setSuccessMessages((prev) => ({
          ...prev,
          nickname: result.message,
        }));
      } else {
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

      // 파일 유효성 검사 (이미지 파일인지 확인)
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      // 파일 크기 제한 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert('파일 크기는 5MB 이하여야 합니다.');
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
      }
    },
    [setValue],
  );

  // 성별 선택 버튼 핸들러 수정
  const handleGenderChange = (gender: 'MALE' | 'FEMALE') => {
    setValue('gender', gender);
    updateGender(gender);

    // 사용자가 업로드한 이미지가 없을 경우에만 기본 이미지 변경
    if (!watch('profileImage')) {
      setProfileImageUrl(
        gender === 'MALE' ? DefaultMaleAvatar.src : DefaultFemaleAvatar.src,
      );
    }
  };

  const handlePrevClick = () => {
    const result = confirm('회원가입을 취소하시겠습니까?');
    if (result) {
      router.replace(NavigationPathname.SignIn);
    }
  };

  const onSubmit = async (data: StepTwoFormData) => {
    if (!isNicknameVerified) {
      setError('nickname', { message: '닉네임 중복확인이 필요합니다.' });
      return;
    }

    try {
      setLoading(true);

      updateNickname(data.nickname);
      updateName(data.name);
      updatePhoneNumber(data.phone);
      updateGender(data.gender);
      if (data.profileImage) {
        updateProfileImage(data.profileImage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-base mt-[106px] flex h-[calc(100dvh-110px)] flex-col justify-between pb-4"
    >
      <div className="mb-[37px] flex flex-col gap-[54px]">
        {/* 닉네임 */}
        <div className="flex flex-col gap-[5px]">
          <label className="text-sm text-[#635F59]">닉네임</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <TextField
                {...register('nickname', {
                  required: '닉네임을 입력해주세요.',
                  validate: (value) => {
                    const validation = validateNicknameFormat(value);
                    return validation.isValid || validation.message;
                  },
                })}
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
                  // 입력 시 공백 제거하고 폼 값 업데이트
                  const withoutSpaces = e.target.value.replace(/\s/g, '');
                  setValue('nickname', withoutSpaces);
                }}
              />
            </div>
            <OliveButton
              type="button"
              onClick={handleNicknameCheck}
              isDisabled={!watch('nickname') || !!errors.nickname || isLoading}
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
            <label className="text-sm text-[#635F59]">프로필 이미지</label>
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
      <div className="flex gap-[10px] py-4">
        <WhiteButton
          onClick={handlePrevClick}
          type="button"
          className="text-lg"
          text="이전"
        />
        <HoneyButton
          type="submit"
          className="text-lg"
          isDisabled={
            !isNicknameVerified ||
            !watch('name') ||
            !watch('phone') ||
            !watch('gender') ||
            isLoading
          }
          text="다음"
        />
      </div>
    </form>
  );
}
