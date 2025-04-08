'use client';

import { HoneyButton } from '@repo/design-system/components/buttons/FillButtons/Honey';
interface LoginButtonsProps {
  isLoading?: boolean;
  isFormValid?: boolean;
}

export default function LoginButton({
  isLoading = false,
  isFormValid = false,
}: LoginButtonsProps) {
  return (
    <button type="submit" className="w-full">
      <HoneyButton
        text="로그인"
        isDisabled={isLoading || !isFormValid}
        isLoading={isLoading}
        className="text-lg font-medium"
      ></HoneyButton>
    </button>
  );
}
