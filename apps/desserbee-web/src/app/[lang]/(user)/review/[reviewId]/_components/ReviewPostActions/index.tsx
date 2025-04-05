'use client';

import { UserContext } from '@/contexts/UserContext';
import Modal from '@repo/design-system/components/Modal';
import { NavigationPathname } from '@repo/entity/src/navigation';
import type { Review } from '@repo/entity/src/review';
import { Button } from '@repo/ui/components/button';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { deleteReviewPost } from './action';

interface Props {
  review: Review;
}

export default function ReviewPostActions({ review }: Props) {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { push, pop } = useContext(PortalContext);

  const handleDelete = async () => {
    const closeModal = () => {
      pop('modal');
    };

    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full rounded-[100px] bg-[#FFB700] py-3 text-center font-medium text-white transition-colors hover:bg-[#FFB700]/90"
                onClick={async () => {
                  const result = await deleteReviewPost(review.id);
                  if (result.success) {
                    closeModal();
                    router.replace(NavigationPathname.CommunityDessertReview);
                  } else {
                    console.error('Failed to delete review');
                  }
                }}
              >
                삭제하기
              </Button>
              <Button
                className="w-full rounded-[100px] bg-[#FFB700] py-3 text-center font-medium text-white transition-colors hover:bg-[#FFB700]/90"
                onClick={closeModal}
              >
                취소하기
              </Button>
            </>
          }
          visible={true}
          title="정말 삭제하시겠습니까?"
          description="삭제한 게시글은 복구할 수 없습니다."
          onClose={closeModal}
        />
      ),
    });
  };

  if (!user || user.id !== review.userId) {
    return null;
  }

  return (
    <div className="flex items-start gap-4">
      <Link
        href={`/review/write/${review.id}`}
        className="cursor-pointer text-[12px] leading-normal tracking-[-0.3px] text-[#393939]"
      >
        수정하기
      </Link>
      <span
        className="cursor-pointer text-[12px] leading-normal tracking-[-0.3px] text-[#393939]"
        onClick={handleDelete}
      >
        삭제하기
      </span>
    </div>
  );
}
