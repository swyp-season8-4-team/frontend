import type { WithSearchParams } from "@/app";
import MateWriteForm from "./_components/MateWriteForm";



export default async function MateWritePage({ searchParams }: WithSearchParams) {
  const { mateId } = await searchParams;

  

  return (
    <main className="px-5 py-4 h-[calc(100dvh - 63px)]">
      <MateWriteForm />
    </main>
  );
}