'use client';

import submitPreferencesAction from "@/actions/submitPreferencesAction";
import { UserContext } from "@/contexts/UserContext";
import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PreferencesContext } from "../../_contexts/PreferencesContext";
import PreferencesIntro from "../PreferencesIntro";
import PreferencesQnA from "../PreferencesQnA";

export default function PreferencesController() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {
    noneMBTI,
    currentQuestion,
    qnaList,
    preferences,
    addPreference,
    updateCurrentQuestion,
  } = useContext(PreferencesContext);

  if (!user) {
    return null;
  }

  return (
    <>
      {currentQuestion === null && (
        <PreferencesIntro
          onClickA={() => {
            updateCurrentQuestion(0);
          }}
          onClickB={() => {
            updateCurrentQuestion('none');
          }}
        />
      )}
      {typeof currentQuestion === 'number' && 
        qnaList.map((qna, index) => {
          if (index === currentQuestion) {
            return (
              <PreferencesQnA 
                {...qna}
                key={`qna-${index}`}
                onClickA={() => {
                  addPreference(index + 1);
                  updateCurrentQuestion(index + 1);
                }}
                onClickB={async () => {
                  if (index === qnaList.length - 1) {
                    await submitPreferencesAction({
                      user,
                      preferences,
                    });
                    router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
                    return;
                  }
                  updateCurrentQuestion(index + 1);
                }}
              />
            );
          }
        })}
        {currentQuestion === 'none' && <PreferencesQnA {...noneMBTI} onClickA={() => {
          router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
        }} onClickB={() => {
          updateCurrentQuestion(null);
        }}/>}
    </>
  )
}