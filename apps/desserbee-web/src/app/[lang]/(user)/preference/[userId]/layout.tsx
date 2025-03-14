import {
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';
import { isTargetUser } from '@repo/entity/src/user';
import type { WithChildren } from '@repo/ui';
import { notFound, redirect } from 'next/navigation';
import { PreferencesProvider } from './_contexts/PreferencesContext';
import type { WithParams } from '@/app';
import UserService from '@repo/usecase/src/userService';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { HeaderContainer } from '../../(menu)/(search)/_components/HeaderContainer';
import { recipeKorea } from '@/app/fonts';

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

export default async function SignInMBTILayout({
  children,
  params,
}: WithChildren & WithParams) {
  const { userId } = await params;
  if (!userId) {
    notFound();
  }

  const targetUser = await userService.getTargetUser(userId);
  if (!isTargetUser(targetUser)) {
    notFound();
  }

  if (targetUser.preferences.length !== 0) {
    redirect(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
  }

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <HeaderContainer fontClass={recipeKorea.className} />
      <div className="flex-1 flex items-center justify-center">
        <PreferencesProvider user={targetUser}>{children}</PreferencesProvider>
      </div>
    </div>
  );
}
