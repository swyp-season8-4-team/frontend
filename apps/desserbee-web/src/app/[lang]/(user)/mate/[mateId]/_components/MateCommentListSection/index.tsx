import type { MateReply } from '@repo/entity/src/mate';
import { MateReplyProvider } from '../../_contexts/MateReplyContext';
import MateComment from '../MateComment';

interface Props {
  replyList: MateReply[];
  isLast: boolean;
}

export default async function MateCommentListSection({
  replyList,
  isLast,
}: Props) {
  return (
    <section className="flex flex-col border rounded-[10px] bg-white px-4 py-2 gap-2">
      <MateReplyProvider
        initialReplyList={replyList}
        initialIsLast={isLast}
        initialCounts={replyList.length}
      >
        {replyList.map((reply) => (
          <MateComment key={reply.mateReplyId} mateReply={reply} />
        ))}
      </MateReplyProvider>
    </section>
  );
}
