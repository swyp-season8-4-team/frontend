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
    <main className="flex flex-col items-center px-4 py-6 text-center gap-3 w-full max-w-[90%]">
      <h2 className="text-[#393939] text-center font-pretendard text-[18px] font-semibold leading-[130%] tracking-[-0.66px]">
        {question}
      </h2>
      {illust && (
        <div className="my-2">
          <Image
            src={illust}
            alt="preference illustration"
            width={280}
            height={180}
            priority
            className="mx-auto w-auto h-auto max-h-[180px]"
          />
        </div>
      )}
      <div className="flex flex-col items-center w-full mt-2">
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
