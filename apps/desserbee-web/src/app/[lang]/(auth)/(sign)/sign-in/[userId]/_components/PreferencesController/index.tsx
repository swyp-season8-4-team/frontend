'use client';

import { useContext } from "react";
import PreferencesIntro from "../PreferencesIntro";
import PreferencesQnA from "../PreferencesQnA";
import { useRouter } from "next/navigation";
import { NavigationLanguageGroup, NavigationPathname } from "@repo/entity/src/navigation";
import { PreferencesContext } from "../../_contexts/PreferencesContext";
import UserService from "@repo/usecase/src/userService";
import UserAPIRepository from "@repo/infrastructures/src/repositories/userAPIRepository";

const userService = new UserService({
  userRepository: new UserAPIRepository(),
});

export default function PreferencesController() {
  const router = useRouter();
  const {
    id,
    noneMBTI,
    currentQuestion,
    qnaList,
    preferences,
    addPreference,
    updateCurrentQuestion,
  } = useContext(PreferencesContext);

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
                    await userService.updatePreferences(id, preferences);
                    updateCurrentQuestion('complete');
                    return;
                  }
                  router.replace(`${NavigationLanguageGroup.ko}${NavigationPathname.Map}`);
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