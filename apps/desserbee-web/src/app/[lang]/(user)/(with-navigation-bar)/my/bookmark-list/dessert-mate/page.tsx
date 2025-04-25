import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import { MyPageSubMenuPageHeader } from '../../_components/MyPageSubMenuPageHeader';
import MateService from '@repo/usecase/src/mateService';
import { MateSavedListContainer } from './_components/MateSavedListContainer';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

export default async function SavedDessertMatePage() {
  const mateService = new MateService({
    authRepository: new AuthNextAppRouteRepository(),
    mateRepository: new MateAPIRepository(),
  });

  const { mates, last } = await commonErrorHandler(
    mateService.getSavedMateList({}),
  );

  return (
    <>
      <div className="bg-page flex min-h-screen flex-col">
        <MyPageSubMenuPageHeader title="저장한 디저트 메이트" />
        <div className="px-base flex flex-1 flex-col justify-start pt-[10%]">
          {mates.length !== 0 ? (
            <MateSavedListContainer mates={mates} isLast={last} />
          ) : (
            <div className="w-full text-center">
              아직 저장된 디저트 메이트가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
