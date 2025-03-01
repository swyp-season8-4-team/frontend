import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import MateComment from "../MateComment";
import MateCommentFilteredMenus from "../MateCommentFilterMenus";
import { MateReplyProvider } from "../../_contexts/MateReplyContext";

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

  console.info(replyList);
  
  return (
    <section className="border rounded-[10px] bg-white px-2 py-2">
      <MateReplyProvider initialReplyList={replyList} initialIsLast={isLast} initialCounts={replyList.length}>
        {/* <MateCommentFilteredMenus /> */}
        {replyList.map((reply) => (
          <MateComment key={reply.mateReplyId} mateReply={reply} />
        ))}
      </MateReplyProvider>  
    </section>
  );
}
