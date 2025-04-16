'use client';

import { SignUpStep } from '@repo/usecase/src/authService';
import { useState } from 'react';
import { SignUpProvider } from '../../_contexts/SignUpContext';
import SignUpStepOne from '../SignUpStepOne';
import SignUpStepTwo from '../SignUpStepTwo';
import SignUpTermsOfServiceForm from '../SignUpTermsOfServiceForm';

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
      {step === SignUpStep.ONE && <SignUpStepOne updateStep={updateStep} />}
      {step === SignUpStep.TWO && <SignUpStepTwo updateStep={updateStep} />}
      {step === SignUpStep.THREE && <SignUpTermsOfServiceForm />}
    </SignUpProvider>
  );
}
