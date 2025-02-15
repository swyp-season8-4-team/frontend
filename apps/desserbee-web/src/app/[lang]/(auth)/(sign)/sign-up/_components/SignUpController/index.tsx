'use client';

import { getVerifyTokenAction } from "@/actions/getVerifyTokenAction";
import { SignUpStep } from "@repo/usecase/src/authService";
import { useEffect, useState } from "react";
import { SignUpProvider } from "../../_contexts/SignUpContext";
import SignUpEmailCodeForm from "../SignUpEmailCodeForm";
import SignUpEmailForm from "../SignUpEmailForm";
import SignUpPasswordForm from "../SignUpPasswordForm";
import SignUpGenderForm from "../SignUpGenderForm";


export default function SignUpController() {
  const [step, setStep] = useState<SignUpStep | null>(null);

  const updateStep = (step: SignUpStep) => {
    setStep(step);
  };

  useEffect(() => {
    if (step !== null) {
      return;
    }

    (async () => {
      const verifyToken = await getVerifyTokenAction();
      if (!!verifyToken) {
        setStep(SignUpStep.PASSWORD);
        return;
      }

      setStep(SignUpStep.EMAIL);
    })();

  }, [step]);

  if (step === null) {
    return null;
  }
  
  return (
    <SignUpProvider>
      {step === SignUpStep.EMAIL && <SignUpEmailForm updateStep={updateStep} />}
      {step === SignUpStep.EMAIL_CODE && <SignUpEmailCodeForm updateStep={updateStep} />}
      {step === SignUpStep.PASSWORD && <SignUpPasswordForm  updateStep={updateStep}/>}
      {step === SignUpStep.GENDER && <SignUpGenderForm />}
    </SignUpProvider>
  )
}
