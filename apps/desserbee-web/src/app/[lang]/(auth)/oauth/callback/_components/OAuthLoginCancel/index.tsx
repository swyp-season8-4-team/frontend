import { OAuthSocialProvider } from '@repo/entity/src/signIn';
import {
  OAuthSocialError,
  OAuthSocialErrorDescription,
} from '@repo/entity/src/signIn';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { NavigationPathname } from '@repo/entity/src/navigation';
import NavigationService from '@repo/usecase/src/navigationService';

const navigationService = new NavigationService({});

interface Props {
  provider: OAuthSocialProvider;
  error: string;
  error_description: string;
}

export default async function OAuthLoginCancel({
  provider,
  error,
  error_description,
}: Props) {
  if (
    provider !== OAuthSocialProvider.KAKAO &&
    error !== OAuthSocialError.ACCESS_DENIED &&
    error_description !== OAuthSocialErrorDescription.USER_ACCESS_DENIED
  ) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center h-[calc(100dvh-56px)] bg-white">
      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-col items-center justify-center w-full px-4 gap-6">
        {/* 경고 아이콘 */}
        <div className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center">
          <span className="text-4xl font-bold">!</span>
        </div>

        {/* 안내 메시지 */}
        <p className="text-[#393939] text-center text-[18px] font-semibold leading-[130%] tracking-[-0.66px]">
          카카오 로그인이 취소되었습니다.
          <br />
          다시 로그인을 시도해주세요.
        </p>

        {/* 버튼 - Link 태그 사용 */}
        <Link
          href={navigationService.getHref(NavigationPathname.SignIn)}
          className="w-full py-3 bg-[#FFC107] rounded-[91.419px] max-w-[532px] text-white text-center text-[18px] font-bold leading-[130%] tracking-[-0.768px] hover:bg-[#FFC107]/90 transition-colors duration-300"
        >
          로그인 화면으로 가기
        </Link>
      </div>
    </main>
  );
}
