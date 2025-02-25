import type { ReactNode } from "react";
import SignInButtons from "../../../_components/SignInButton";
import Image from "next/image";

interface Props {
  question: string | ReactNode;
  answerA: string;
  answerB?: string;
  illust?: string;
  onClickA: () => void;
  onClickB: () => void;
}

export default function PreferencesQnA({ question, answerA, answerB, illust, onClickA, onClickB }: Props) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 text-center gap-[32px]">
      <p className="text-[#393939] text-center font-pretendard text-[14px] font-semibold leading-[130%] tracking-[-0.42px]">{question}</p>
      {illust && <Image src={illust} alt={illust} width={166} height={100} />}
      <SignInButtons firstButtonText={answerA} secondButtonText={answerB} onClickA={onClickA} onClickB={onClickB} />
    </div>
  )
}