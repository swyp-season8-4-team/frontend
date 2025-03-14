'use client';

import { revalidatePathAction } from '@/actions/revalidatePathAction';
import { UserContext } from '@/contexts/UserContext';
import { RouteGroup } from '@repo/entity/src/navigation';
import ReviewAPIRepository from '@repo/infrastructures/src/repositories/reviewAPIRepository';
import { Button } from '@repo/ui/components/button';
import ReviewService from '@repo/usecase/src/reviewService';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { ReviewDetailContext } from '../../_contexts/ReviewDetailContext';

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
});

export default function ReviewCommentForm() {
  const { review } = useContext(ReviewDetailContext);
  const { user, realProfileImageUrl } = useContext(UserContext);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await reviewService.createReply({
        id: review.id,
        userId: user?.id,
        content: comment,
      });

      await revalidatePathAction(RouteGroup.ReviewDetail, 'page');

      setComment('');
    } catch (error) {
      console.error('댓글 등록 실패:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start gap-2">
        <Image
          src={realProfileImageUrl}
          alt={`${user?.nickname}의 댓글`}
          width={32}
          height={32}
          className="rounded-full"
        />

        <div className="flex-1">
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:border-[#FDB813] min-h-[60px] pb-7"
              disabled={isSubmitting}
              maxLength={300}
            />
            <div className="absolute bottom-2 right-3">
              <span className="text-xs text-gray-500">
                {comment.length}/300
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              disabled={!comment.trim() || isSubmitting}
              isLoading={isSubmitting}
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                comment.trim() && !isSubmitting
                  ? 'bg-[#FDB813] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              등록
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
