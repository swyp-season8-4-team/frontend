'use client';

// 댓글 입력 폼 컴포넌트
import { useContext, useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { UserContext } from '@/contexts/UserContext';
import Image from 'next/image';
import MateService from '@repo/usecase/src/mateService';
import MateAPIRepository from '@repo/infrastructures/src/repositories/mateAPIRepository';
import { MateDetailContext } from '../../_contexts/MateDetailContext';
import { revalidatePathAction } from '@/actions/revalidatePathAction';
import { RouteGroup } from '@repo/entity/src/navigation';

const mateService = new MateService({
  mateRepository: new MateAPIRepository(),
})

export default function CommentForm() {
  const { mate } = useContext(MateDetailContext);
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
      await mateService.createReply({
        id: mate.id,
        userId: user?.id,
        content: comment,
      });

      await revalidatePathAction(RouteGroup.MateDetail, 'page');
      
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
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:border-[#FDB813] min-h-[60px]"
            disabled={isSubmitting}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{comment.length}/300</span>
            <Button
              type="submit"
              disabled={!comment.trim() || isSubmitting}
              className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                comment.trim() && !isSubmitting
                  ? 'bg-[#FDB813] text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isSubmitting ? '등록 중...' : '등록'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}