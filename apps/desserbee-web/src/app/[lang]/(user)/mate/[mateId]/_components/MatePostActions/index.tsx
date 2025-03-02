'use client';

import { UserContext } from "@/contexts/UserContext";
import Modal from "@repo/design-system/components/Modal";
import type { Mate } from "@repo/entity/src/mate";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import { Button } from "@repo/ui/components/button";
import { PortalContext } from "@repo/ui/contexts/PortalContext";
import MateService from "@repo/usecase/src/mateService";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { NavigationPathname } from "@repo/entity/src/navigation";

const mateService = new MateService({
  mateRepository: new MateAPIRepository(), 
});

interface Props {
  mate: Mate;
}

export default function MatePostActions({ mate }: Props) {
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
                  await mateService.delete({
                    id: mate.id,
                  });
                  closeModal();
                  router.replace(NavigationPathname.CommunityDessertMate);
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

  if (!user || user.id !== mate.userId) {
    return null;
  }

  return (
    <div className="flex gap-4 items-start">
      <Link 
        href={`/mate/write/${mate.id}`}
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