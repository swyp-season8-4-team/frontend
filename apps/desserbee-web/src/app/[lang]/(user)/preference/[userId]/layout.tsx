import type { WithParams } from '@/app';
import { NavigationPathname } from '@repo/entity/src/navigation';
import { isTargetUser } from '@repo/entity/src/user';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import type { WithChildren } from '@repo/ui';
import NavigationService from '@repo/usecase/src/navigationService';
import UserService from '@repo/usecase/src/userService';
import { notFound, redirect } from 'next/navigation';
import { HeaderContainer } from '../../_components/HeaderContainer';
import { PreferencesProvider } from './_contexts/PreferencesContext';

const navigationService = new NavigationService({});

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

export default async function PreferenceLayout({
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
    redirect(navigationService.getHref(NavigationPathname.Map));
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-white">
      <HeaderContainer />
      <div className="mt-[56px] flex flex-1 justify-center overflow-hidden">
        <PreferencesProvider user={targetUser}>{children}</PreferencesProvider>
      </div>
    </div>
  );
}
