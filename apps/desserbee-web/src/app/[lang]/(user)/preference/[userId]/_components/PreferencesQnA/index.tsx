import type { ReactNode } from 'react';
import SignInButtons from '../../../../../(auth)/(sign)/sign-in/_components/SignInButton';
import Image from 'next/image';

interface Props {
  question: string | ReactNode;
  answerA: string;
  answerB?: string;
  illust?: string;
  onClickA: () => void;
  onClickB: () => void;
}

export default function PreferencesQnA({
  question,
  answerA,
  answerB,
  illust,
  onClickA,
  onClickB,
}: Props) {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-8 text-center gap-8 w-full max-w-md">
      <h2 className="text-[#393939] text-center font-pretendard text-[22px] font-semibold leading-[130%] tracking-[-0.66px]">
        {question}
      </h2>
      {illust && (
        <div className="my-4">
          <Image
            src={illust}
            alt="preference illustration"
            width={300}
            height={200}
            priority
            className="mx-auto"
          />
        </div>
      )}
      <div className="w-full mt-4">
        <SignInButtons
          firstButtonText={answerA}
          secondButtonText={answerB}
          onClickA={onClickA}
          onClickB={onClickB}
        />
      </div>
    </main>
  );
}
