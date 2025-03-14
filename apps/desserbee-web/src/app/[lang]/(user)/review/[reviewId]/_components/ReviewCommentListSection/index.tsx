import type { ReviewReply } from '@repo/entity/src/review';
import { ReviewReplyProvider } from '../../_contexts/ReviewReplyContext';
import ReviewComment from '../ReviewComment';

interface Props {
  replyList: ReviewReply[];
  isLast: boolean;
}

export default async function ReviewCommentListSection({
  replyList,
  isLast,
}: Props) {
  return (
    <section className="flex flex-col border rounded-[10px] bg-white px-4 py-2 gap-2">
      <ReviewReplyProvider
        initialReplyList={replyList}
        initialIsLast={isLast}
        initialCounts={replyList.length}
      >
        {replyList.map((reply) => (
          <ReviewComment key={reply.replyId} reviewReply={reply} />
        ))}
      </ReviewReplyProvider>
    </section>
  );
}
