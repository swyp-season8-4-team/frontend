export interface ForgotPasswordStepProps {
  onNextStep: (step: ForgotPasswordStep) => void;
}

export enum ForgotPasswordStep {
  Email = 'email',
  AuthCode = 'auth-code',
  NewPassword = 'new-password',
}
