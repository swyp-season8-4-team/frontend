'use client';

import { useState } from 'react';
import { ForgotPasswordProvider } from '../../_contexts/ForgotPasswordContext';
import { ForgotPasswordStep } from '../../_types';
import { ForgotPasswordAuthCodeForm } from '../ForgotPasswordAuthCodeForm';
import { ForgotPasswordEmailForm } from '../ForgotPasswordEmailForm';
import { ForgotPasswordInputForm } from '../ForgotPasswordInputForm';

export function ForgotPasswordController() {
  const [step, setStep] = useState<ForgotPasswordStep>(
    ForgotPasswordStep.Email,
  );

  const updateStep = (step: ForgotPasswordStep) => {
    setStep(step);
  };

  return (
    <ForgotPasswordProvider>
      {step === ForgotPasswordStep.Email && (
        <ForgotPasswordEmailForm onNextStep={updateStep} />
      )}
      {step === ForgotPasswordStep.AuthCode && (
        <ForgotPasswordAuthCodeForm onNextStep={updateStep} />
      )}
      {step === ForgotPasswordStep.NewPassword && <ForgotPasswordInputForm />}
    </ForgotPasswordProvider>
  );
}
