'use client';

import { startTransition, useContext, useEffect, useRef, useState } from "react";
import { CommunityMateListContext } from "../../_contexts/CommunityMateListContext";
import CommunityMateCard from "../CommunityMateCard";
import { nanoid } from "nanoid";

export default function CommunityMateList() {
  const { mates, isLast, loadMore } = useContext(CommunityMateListContext);
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
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, loadMore, isLoading]);

  return (
    <section className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] space-y-4">
      {mates.map((mate) => {
        return (
          <CommunityMateCard
            key={mate.id || nanoid(10)}
            mate={mate}
          />
        )
      })}
      <div ref={observerRef} />
    </section>
  )
}