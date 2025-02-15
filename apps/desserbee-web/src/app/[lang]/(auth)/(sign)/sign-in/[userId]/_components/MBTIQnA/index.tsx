import type { ReactNode } from "react";
import SignInButtons from "../../../_components/SignInButton";

interface Props {
  question: string | ReactNode;
  answerA: string;
  answerB?: string;
  onClickA: () => void;
  onClickB: () => void;
}

export default function MBTIQnA({ question, answerA, answerB, onClickA, onClickB }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center gap-[32px]">
      <p className="text-2xl font-bold">{question}</p>
      <div className="w-full max-w-[328px] h-[200px] flex-shrink-0 bg-[#E8E8E8]">
        임시 일러스트
      </div>
      <SignInButtons firstButtonText={answerA} secondButtonText={answerB} onClickA={onClickA} onClickB={onClickB} />
    </div>
  )
}