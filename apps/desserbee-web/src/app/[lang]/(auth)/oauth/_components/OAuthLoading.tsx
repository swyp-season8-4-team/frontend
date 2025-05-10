'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import ReadyBee from '@/assets/images/bee_icon_ready.png';
import type { WithChildren } from '@repo/ui/index';

export default function OAuthLoading({ children }: WithChildren) {
  return (
    <main className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center">
      <div className="mb-16 space-y-2 text-center">
        <h2 className="text-xl font-medium">열심히 로그인 중입니다!</h2>
        <p className="text-gray-600">잠시만 기다려주세요.</p>
      </div>

      <div className="relative h-32 w-[328px]">
        {/* 꿀벌 */}
        <motion.div
          className="absolute top-0"
          animate={{
            x: [40, 132, 204], // 각 육각형 위치로만 이동
          }}
          transition={{
            duration: 3, // 전체 애니메이션 시간 단축
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1], // 부드러운 이동을 위한 easing
            times: [0, 0.5, 1], // 각 위치에서 동일한 시간 머무름
          }}
        >
          <Image src={ReadyBee} alt="bee" width={72} height={72} />
        </motion.div>

        {/* 육각형들 */}
        <div className="absolute inset-0 top-[64px] flex items-center justify-center gap-[48px] px-8">
          <motion.div
            animate={{
              y: [-4, 4, -4], // 위아래로 움직임 추가
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: 0,
                ease: 'easeInOut',
              },
              y: {
                // y축 움직임에 대한 별도의 transition
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            <HexagonIcon className="color=[#FFE39D] h-8 w-8 text-[#FFE39D]" />
          </motion.div>
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: 1,
                ease: 'easeInOut',
              },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.6, // 각 육각형마다 다른 타이밍
              },
            }}
          >
            <HexagonIcon className="color=[#FFCC4D] h-8 w-8 text-[#FFCC4D]" />
          </motion.div>
          <motion.div
            animate={{
              y: [-4, 4, -4],
            }}
            transition={{
              opacity: {
                duration: 3,
                repeat: Infinity,
                delay: 2,
                ease: 'easeInOut',
              },
              y: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2, // 각 육각형마다 다른 타이밍
              },
            }}
          >
            <HexagonIcon className="color=[#FFB700] h-8 w-8 text-[#FFB700]" />
          </motion.div>
        </div>
      </div>
      {children}
    </main>
  );
}

function HexagonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z" />
    </svg>
  );
}
