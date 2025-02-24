'use client';

import { useContext, useEffect, useRef } from "react";
import { CommunityMateContext } from "../../_contexts/CommunityMateContext";
import CommunityMateCard from "../CommunityMateCard";

export default function CommunityMateList() {
  const { mates, isLast, loadMore } = useContext(CommunityMateContext);
  const observerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries[0].isIntersecting, isLast);
        if (entries[0].isIntersecting && !isLast) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [isLast, loadMore]);

  return (
    <section className="flex-1 overflow-y-auto relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] space-y-4">
      {mates.map((mate) => {
        return (
          <CommunityMateCard
            key={mate.id}
            mate={mate}
          />
        )
      })}
      <div ref={observerRef} className="h-4" />
    </section>
  )
}