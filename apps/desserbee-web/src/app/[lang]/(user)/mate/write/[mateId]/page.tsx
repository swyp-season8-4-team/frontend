import type { WithParams } from "@/app";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import MateAPIRepository from "@repo/infrastructures/src/repositories/mateAPIRepository";
import MateService from "@repo/usecase/src/mateService";
import { notFound } from "next/navigation";
import MateWriteForm from "../_components/MateWriteForm";

const mateService = new MateService({
  authRepository: new AuthNextAppRouteRepository(),
  mateRepository: new MateAPIRepository(),
});

export default async function MateWriteUpdatePage({ params }: WithParams) {
  const { mateId } = await params;
  if (!mateId) {
    notFound();
  }

  const mate = await mateService.getDetails({
    id: mateId,
  });

  if (!mate) {
    notFound();
  }
  
  return (
    <main className="px-5 py-4 h-[calc(100dvh - 63px)]">
      <MateWriteForm initialMate={mate} />
    </main>
  );
}