'use client';

import { UserContext } from '@/contexts/UserContext';
import { Button } from '@repo/ui/components/button';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { ReviewDetailContext } from '../../_contexts/ReviewDetailContext';
import { createReviewComment } from './action';

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
      const result = await createReviewComment({
        reviewId: review.id,
        userId: user.id,
        content: comment,
      });

      if (result.success) {
        setComment('');
      } else {
        console.error('댓글 등록 실패');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-start gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image
            src={realProfileImageUrl}
            alt={`${user?.nickname}의 댓글`}
            width={50}
            height={50}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력해주세요."
              className="min-h-[60px] w-full resize-none rounded-lg border border-gray-300 px-3 py-2 pb-7 text-sm focus:border-[#FDB813] focus:outline-none"
              disabled={isSubmitting}
              maxLength={300}
            />
            <div className="absolute bottom-2 right-3">
              <span className="text-xs text-gray-500">
                {comment.length}/300
              </span>
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Button
              type="submit"
              disabled={!comment.trim() || isSubmitting}
              isLoading={isSubmitting}
              className={`rounded-full px-4 py-1.5 text-sm font-medium ${
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
