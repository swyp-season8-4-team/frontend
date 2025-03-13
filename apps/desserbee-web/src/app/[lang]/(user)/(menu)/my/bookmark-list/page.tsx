import { BookMarkListContainer } from './_components/BookMarkListContainer';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import StoreService from '@repo/usecase/src/storeService';
import StoreAPIRepository from '@repo/infrastructures/src/repositories/storeAPIRepository';
import UserService from '@repo/usecase/src/userService';
import UserAPIRepository from '@repo/infrastructures/src/repositories/userAPIRepository';
import { redirect } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

const storeService = new StoreService({
  authRepository: new AuthNextAppRouteRepository(),
  storeRepository: new StoreAPIRepository(),
});

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

export default async function MyBookmarkListPage() {
  const userUuid = await userService.getUserID();

  if (!userUuid) redirect(NavigationPathname.SignIn);

  const savedList = await storeService.getSavedListAll(userUuid);

  const { mates } = await mateService.getSavedMateList({
    from: 0,
    to: 4,
  });

  return <BookMarkListContainer mateList={mates} savedList={savedList} />;
}
