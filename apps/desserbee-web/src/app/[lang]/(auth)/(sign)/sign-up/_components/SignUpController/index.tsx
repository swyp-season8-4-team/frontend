'use client';

import { SignUpStep } from "@repo/usecase/src/authService";
import { useState } from "react";
import { SignUpProvider } from "../../_contexts/SignUpContext";
import SignUpEmailCodeForm from "../SignUpEmailCodeForm";
import SignUpEmailForm from "../SignUpEmailForm";
import SignUpGenderForm from "../SignUpGenderForm";
import SignUpNicknameImageForm from "../SignUpNicknameImageForm";
import SignUpPasswordForm from "../SignUpPasswordForm";

interface Props {
  token: string | null;
}

export default function SignUpController({ token }: Props) {
  const [step, setStep] = useState<SignUpStep | null>(
    !!token ? SignUpStep.PASSWORD : SignUpStep.EMAIL
  );

  const updateStep = (step: SignUpStep) => {
    setStep(step);
  };
  
  return (
    <SignUpProvider>
      {step === SignUpStep.EMAIL && <SignUpEmailForm updateStep={updateStep} />}
      {step === SignUpStep.EMAIL_CODE && <SignUpEmailCodeForm updateStep={updateStep} />}
      {step === SignUpStep.PASSWORD && <SignUpPasswordForm  updateStep={updateStep}/>}
      {step === SignUpStep.GENDER && <SignUpGenderForm updateStep={updateStep}/>}
      {step === SignUpStep.NICKNAME && <SignUpNicknameImageForm updateStep={updateStep} />}
    </SignUpProvider>
  )
}
