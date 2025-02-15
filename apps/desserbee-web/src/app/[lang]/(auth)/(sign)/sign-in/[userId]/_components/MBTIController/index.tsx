'use client';

import { useContext } from "react";
import MBTIIntro from "../MBTIIntro";
import MBTIQnA from "../MBTIQnA";
import { useRouter } from "next/navigation";
import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { MBTIContext } from "../../../_contexts/MBTIContext";

export default function MBTIController() {
  const router = useRouter();
  const {
    id,
    currentQuestionNumber,
    updateCurrentQuestionNumber,
    qnaList,
  } = useContext(MBTIContext);

  return (
    <>
      {currentQuestionNumber === null && (
        <MBTIIntro
          onClickA={() => {
            updateCurrentQuestionNumber(0);
          }}
          onClickB={() => {
            router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.SignIn}/${id}/none`);
          }}
        />
      )}
      {typeof currentQuestionNumber === 'number' && 
        qnaList.map((qna, index) => {
          if (index === currentQuestionNumber) {
            return <MBTIQnA {...qna} key={`qna-${index}`} onClickA={() => {
              updateCurrentQuestionNumber(index + 1);
            }} onClickB={() => {
                if (index === qnaList.length - 1) {
                  router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.SignIn}/${id}/complete`);
                  return;
                }
                router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
              }} />
          }
        })}
    </>
  )
}