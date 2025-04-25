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
import ReviewService from '@repo/usecase/src/reviewService';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const userService = new UserService({
  authRepository: new AuthNextAppRouteRepository(),
  userRepository: new UserAPIRepository(),
});

const storeService = new StoreService({
  authRepository: new AuthNextAppRouteRepository(),
  storeRepository: new StoreAPIRepository(),
});

const reviewService = new ReviewService({
  authRepository: new AuthNextAppRouteRepository(),
  reviewRepository: new ReviewAPIRepository(),
});

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

export default async function MyBookmarkListPage() {
  const userUuid = await commonErrorHandler(userService.getUserID());

  if (!userUuid) redirect(NavigationPathname.SignIn);

  const savedStoreList = await commonErrorHandler(
    storeService.getSavedListAll(userUuid),
  );

  const { mates } = await commonErrorHandler(
    mateService.getSavedMateList({
      from: 0,
      to: 4,
    }),
  );

  const savedReview = await commonErrorHandler(
    reviewService.getSaved({ from: 0, to: 4 }),
  );

  return (
    <BookMarkListContainer
      savedStoreList={savedStoreList}
      savedReview={savedReview}
      mateList={mates}
    />
  );
}
