import Link from 'next/link';
import NavigationService from '@repo/usecase/src/navigationService';
import { NavigationPathname } from '@repo/entity/src/navigation';
export function SignUpLink() {
  const navigationService = new NavigationService({});
  return (
    <div className="text-neutral-30 flex w-full items-center justify-center gap-[11px] py-[34px] text-sm">
      <div>아직 계정이 없으신가요?</div>
      <Link
        href={navigationService.getHref(NavigationPathname.SignUp)}
        className="text-secondary-30 text-b-400 font-medium underline decoration-solid decoration-from-font underline-offset-auto"
      >
        회원가입
      </Link>
    </div>
  );
}
