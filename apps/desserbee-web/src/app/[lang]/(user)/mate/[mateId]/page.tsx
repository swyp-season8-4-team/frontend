import type { WithParams } from "@/app";
import { notFound } from "next/navigation";

export default async function MateDetailPage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }


  return (
    <main className="flex flex-col h-full gap-[21px]">

    </main>
  )
}