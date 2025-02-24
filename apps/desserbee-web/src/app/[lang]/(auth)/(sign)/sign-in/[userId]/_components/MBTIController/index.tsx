'use client';

import { useContext } from "react";
import MBTIIntro from "../MBTIIntro";
import MBTIQnA from "../MBTIQnA";
import { useRouter } from "next/navigation";
import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { MBTIContext } from "../../_contexts/MBTIContext";

export default function MBTIController() {
  const router = useRouter();
  const {
    noneMBTI,
    currentQuestion,
    updateCurrentQuestion,
    qnaList,
  } = useContext(MBTIContext);

  return (
    <>
      {currentQuestion === null && (
        <MBTIIntro
          onClickA={() => {
            updateCurrentQuestion(0);
          }}
          onClickB={() => {
            updateCurrentQuestion('none');
            // router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.SignIn}/${id}/none`);
          }}
        />
      )}
      {typeof currentQuestion === 'number' && 
        qnaList.map((qna, index) => {
          if (index === currentQuestion) {
            return <MBTIQnA {...qna} key={`qna-${index}`} onClickA={() => {
              updateCurrentQuestion(index + 1);
            }} onClickB={() => {
                if (index === qnaList.length - 1) {
                  updateCurrentQuestion('complete');
                  // router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.SignIn}/${id}/complete`);
                  return;
                }
                router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
              }} />
          }
        })}
        {currentQuestion === 'none' && <MBTIQnA {...noneMBTI} onClickA={() => {
          router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
        }} onClickB={() => {
          updateCurrentQuestion(null);
        }}/>}
    </>
  )
}