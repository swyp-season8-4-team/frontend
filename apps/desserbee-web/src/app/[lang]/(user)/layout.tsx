import { UserProvider } from '@/contexts/UserContext';
import type { WithChildren } from '@repo/ui/index';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import UserService from '@repo/usecase/src/userService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import AuthService from '@repo/usecase/src/authService';

const authService = new AuthService({
  authRepository: new AuthNextAppRouteRepository(),
});

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

export default async function UserLayout({ children }: WithChildren) {
  const auth = await authService.getAuthorization();
  console.log('auth', auth);
  if (!auth) {
    return children;
  }
  
  const user = await userService.getMe();

  return (
    <UserProvider user={user}>
      {children}
    </UserProvider>
  );
}
