import type { WithChildren } from '@repo/ui/index';
import NavigationContainer from './(search)/_components/NavigationContainer';
import AuthService from '@repo/usecase/src/authService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const authService = new AuthService({
  authRepository: new AuthNextAppRouteRepository(),
})

export default async function UserMenuLayout({ children }: WithChildren) {
  const authorization = await authService.getAuthorization();
  return (
    <div className="bg-page h-[100dvh] text-default">
      {children}
      <NavigationContainer isAuthorized={!!authorization} />
    </div>
  );
}
