'use client';

import { UserContext } from "@/contexts/UserContext";
import type { Mate } from "@repo/entity/src/mate";
import type { WithChildren } from "@repo/ui";
import { useContext } from "react";

interface Props extends WithChildren {
  mate: Mate;
}

export default function MyMateDetailSection({ children, mate }: Props) {
  const { user } = useContext(UserContext);

  // 남의 게시물일때
  if (user?.id !== mate.userId) {
    return null;
  }

  return (
    <section className="border rounded-[10px] bg-white px-2 py-2">
      {children}
    </section>
  )
}