import Link from 'next/link';
import NavigationService from '@repo/usecase/src/navigationService';
import { NavigationPathname } from '@repo/entity/src/navigation';
export function SignUpLink() {
  const navigationService = new NavigationService({});
  return (
    <div className="flex w-full items-center justify-center py-[34px] text-sm text-[#595959]">
      <div>아직 계정이 없으신가요?&nbsp;</div>
      <Link
        href={navigationService.getHref(NavigationPathname.SignUp)}
        className="text-b-400 underline decoration-solid decoration-from-font underline-offset-auto"
      >
        일반 회원가입
      </Link>
    </div>
  );
}
