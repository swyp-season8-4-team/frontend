import { NavigationPathname } from '@repo/entity/src/navigation';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import type { WithChildren } from '@repo/ui/index';
import AuthService from '@repo/usecase/src/authService';
import { redirect } from 'next/navigation';

const authService = new AuthService({
  authRepository: new AuthNextAppRouteRepository(),
});

export default async function MyLayout({ children }: WithChildren) {
  const authorization = await authService.getAuthorization();

  if (!authorization) {
    redirect(NavigationPathname.SignIn);
  }
  
  return children;
  
}