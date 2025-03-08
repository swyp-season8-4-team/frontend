'use client';

import { UserContext } from "@/contexts/UserContext";
import Modal from "@repo/design-system/components/Modal";
import { NavigationPathname } from "@repo/entity/src/navigation";
import type { Review } from "@repo/entity/src/review";
import ReviewAPIRepository from "@repo/infrastructures/src/repositories/reviewAPIRepository";
import { Button } from "@repo/ui/components/button";
import { PortalContext } from "@repo/ui/contexts/PortalContext";
import ReviewService from "@repo/usecase/src/reviewService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const reviewService = new ReviewService({
  reviewRepository: new ReviewAPIRepository(),
});

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
    }

    push('modal', {
      component: (
        <Modal
          buttons={
            <>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] font-medium transition-colors bg-[#FFB700] hover:bg-[#FFB700]/90"
                onClick={async () => {
                  await reviewService.delete({
                    id: review.id,
                  });
                  closeModal();
                  router.replace(NavigationPathname.CommunityDessertReview);
                }}
              >
                삭제하기
              </Button>
              <Button
                className="w-full py-3 text-white text-center rounded-[100px] font-medium transition-colors bg-[#FFB700] hover:bg-[#FFB700]/90"
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
      )
    });
  }

  if (!user || user.id !== review.userId) {
    return null;
  }

  return (
    <div className="flex gap-4 items-start">
      <Link 
        href={`/review/write/${review.id}`}
        className="text-[#393939] text-[12px] tracking-[-0.3px] leading-normal cursor-pointer"
      >
        수정하기
      </Link>
      <span
        className="text-[#393939] text-[12px] tracking-[-0.3px] leading-normal cursor-pointer"
        onClick={handleDelete}
      >
        삭제하기
      </span>
    </div>
  )
}