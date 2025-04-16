'use client';

import { SignUpStep } from '@repo/usecase/src/authService';
import { useState } from 'react';
import { SignUpProvider } from '../../_contexts/SignUpContext';
import SignUpStepOne from '../SignUpStepOne';
import SignUpStepTwo from '../SignUpStepTwo';

interface Props {
  token: string | null;
}

export default function SignUpController({ token }: Props) {
  const [step, setStep] = useState<SignUpStep>(SignUpStep.ONE);

  const updateStep = (step: SignUpStep) => {
    setStep(step);
  };

  return (
    <SignUpProvider>
      {step === SignUpStep.TWO && <SignUpStepOne updateStep={updateStep} />}
      {step === SignUpStep.ONE && <SignUpStepTwo updateStep={updateStep} />}
    </SignUpProvider>
  );
}
