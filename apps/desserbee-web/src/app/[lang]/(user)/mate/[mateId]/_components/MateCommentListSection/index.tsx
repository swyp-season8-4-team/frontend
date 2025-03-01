import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { MateReplyProvider } from "../../_contexts/MateReplyContext";
import MateComment from "../MateComment";

const mateService = new MateService({
  mateRepository: new MateAPIRepository(), 
});

interface Props {
  mateId: string;
}

export default async function MateCommentListSection({ mateId }: Props) {
  const { replyList, isLast } = await mateService.getReplyList({
    id: mateId,
    from: 0,
    to: 3,
  });

  if (replyList.length === 0) {
    return null;
  }
  
  return (
    <section className="flex flex-col border rounded-[10px] bg-white px-4 py-2 gap-2">
      <MateReplyProvider initialReplyList={replyList} initialIsLast={isLast} initialCounts={replyList.length}>
        {replyList.map((reply) => (
          <MateComment key={reply.mateReplyId} mateReply={reply} />
        ))}
      </MateReplyProvider>  
    </section>
  );
}
