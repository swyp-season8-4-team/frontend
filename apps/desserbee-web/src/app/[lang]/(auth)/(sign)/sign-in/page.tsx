import { recipeKorea } from '@/app/fonts';
import IconBee from '@repo/design-system/components/icons/IconBee';
import LoginForm from './_components/LoginForm';
import { SignUpLink } from './_components/SignUpLink';
import { cn } from '@repo/ui/lib/utils';
import KakaoSignInButton from './_components/KakaoSignInButton';

export default async function SignInPage() {
  return (
    <>
      {/* 메인 컨텐츠 */}
      <main className="px-base">
        <div className="flex w-full items-center justify-center gap-[11.39px] py-[75.5px]">
          <div className="flex h-[48.77px] w-[48.77px] items-center justify-center">
            <IconBee className="h-full w-full" />
          </div>
          <div
            className={cn(
              recipeKorea.className,
              'self-center pt-4 text-4xl text-[#271900]',
            )}
          >
            디저비
          </div>
        </div>

        <LoginForm className="space-y-4" />

        {/* 간편 로그인 섹션 */}
        <section className="">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative my-3 flex justify-center text-[10px]">
              <span className="text-neutral-30 bg-white px-4">또는</span>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <KakaoSignInButton />
          </div>
          <SignUpLink />
        </section>
      </main>
    </>
  );
}
