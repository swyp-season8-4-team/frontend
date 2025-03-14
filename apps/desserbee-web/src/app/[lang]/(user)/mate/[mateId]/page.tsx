import type { WithParams } from '@/app';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import MateService from '@repo/usecase/src/mateService';
import { notFound } from 'next/navigation';
import MateCommentForm from './_components/CommentForm';
import CurrentApplyList from './_components/CurrentApplyList';
import MatePostSection from './_components/MatePostSection';
import MyMateDetailSection from './_components/MyMateDetailSection';
import { MateDetailProvider } from './_contexts/MateDetailContext';
import MateCommentListSection from './_components/MateCommentListSection';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

export default async function MateDetailPage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }

  const [mateResult, waitListResult, replyListResult] =
    await Promise.allSettled([
      mateService.getDetails({
        id: mateId,
      }),
      mateService.getWaitList({
        id: mateId,
      }),
      mateService.getReplyList({
        id: mateId,
      }),
    ]);

  const mate = mateResult.status === 'fulfilled' ? mateResult.value : null;
  if (!mate) {
    notFound();
  }

  const waitList =
    waitListResult.status === 'fulfilled' ? waitListResult.value : [];

  const replyListResponse =
    replyListResult.status === 'fulfilled' ? replyListResult.value : null;

  return (
    <main className="flex flex-col h-[calc(100dvh - 52px)] px-4 py-4 gap-4 bg-[#f6f6f6] overflow-y-auto ">
      <MateDetailProvider mate={mate}>
        <MatePostSection
          mate={mate}
          replyCount={replyListResponse?.replyList.length ?? 0}
        />

        <MyMateDetailSection mate={mate}>
          <div className="px-4">
            <CurrentApplyList waitList={waitList} />
          </div>
        </MyMateDetailSection>

        {replyListResponse && replyListResponse.replyList.length > 0 && (
          <MateCommentListSection
            replyList={replyListResponse.replyList}
            isLast={replyListResponse.isLast}
          />
        )}
        {mate.applyStatus === 'APPROVED' && <MateCommentForm />}
      </MateDetailProvider>
    </main>
  );
}
