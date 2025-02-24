'use client';

import { useCallback, useState } from "react";
import { ForgotPasswordStep } from "../../_types";
import { ForgotPasswordEmailForm } from "../ForgotPasswordEmailForm";
import { ForgotPasswordAuthCodeForm } from "../ForgotPasswordAuthCodeForm";
import { ForgotPasswordInputForm } from "../ForgotPasswordInputForm";
import { ForgotPasswordProvider } from "../../_contexts/ForgotPasswordContext";

export function ForgotPasswordController() {
  const [step, setStep] = useState<ForgotPasswordStep>(ForgotPasswordStep.Email);
  
  const updateStep = (step: ForgotPasswordStep) => {
    console.log(step);
    setStep(step);
  };

  console.log(step);

  return (
    <ForgotPasswordProvider>
      {step === ForgotPasswordStep.Email && (
        <ForgotPasswordEmailForm onNextStep={updateStep} />
      )}
      {step === ForgotPasswordStep.AuthCode && (
        <ForgotPasswordAuthCodeForm onNextStep={updateStep} />
      )}
      {step === ForgotPasswordStep.NewPassword && (
        <ForgotPasswordInputForm  />
      )}
    </ForgotPasswordProvider>
  )
}
