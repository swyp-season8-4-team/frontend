'use client';

import {
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { nanoid } from 'nanoid';
import { CommunityReviewListContext } from '../../_contexts/CommunityReviewListContext';
import CommunityReviewCard from '../CommunityReviewCard';

export default function CommunityReviewList() {
  const { reviews, isLast, loadMore } = useContext(CommunityReviewListContext);
  const observerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && !isLast && !isLoading) {
          startTransition(async () => {
            setIsLoading(true);
            await loadMore();
            setIsLoading(false);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, loadMore, isLoading]);

  return (
    <div className="flex flex-col gap-[6px]">
      {reviews.map((review) => {
        return (
          <CommunityReviewCard key={review.id || nanoid(10)} review={review} />
        );
      })}
      <div ref={observerRef} />
    </div>
  );
}
