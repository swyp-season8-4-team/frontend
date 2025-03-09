import type { WithParams } from "@/app";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { notFound } from "next/navigation";
import CommentForm from "./_components/CommentForm";
import CurrentApplyList from "./_components/CurrentApplyList";
import MatePostSection from "./_components/MatePostSection";
import MyMateDetailSection from "./_components/MyMateDetailSection";
import { MateDetailProvider } from "./_contexts/MateDetailContext";
import MateCommentListSection from "./_components/MateCommentListSection";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(), 
})

export default async function MateDetailPage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }

  const [mateResult, waitListResult] = await Promise.allSettled([
    mateService.getDetails({
      id: mateId,
    }),
    mateService.getWaitList({
      id: mateId,
    }),
  ]);

  const mate = mateResult.status === 'fulfilled' ? mateResult.value : null;
  if (!mate) {
    notFound();
  }

  const waitList = waitListResult.status === 'fulfilled' ? waitListResult.value : [];

  return (
    <main className="flex flex-col h-[calc(100dvh - 52px)] px-4 gap-4 bg-[#f6f6f6]">
      <MateDetailProvider mate={mate}>
        <MatePostSection mate={mate} replyCount={waitList.length} />
        
        <MyMateDetailSection mate={mate}>
          <div className="px-4">
            <CurrentApplyList waitList={waitList} />
          </div>
        </MyMateDetailSection>
      
      
        <MateCommentListSection mateId={mateId} />
        {mate.applyStatus === 'APPROVED' && <CommentForm />}
      </MateDetailProvider>
    </main>
  );
}