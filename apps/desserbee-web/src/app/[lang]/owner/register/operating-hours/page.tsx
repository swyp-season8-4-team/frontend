'use client';

import { useContext, useState } from 'react';
import { useRegister, RegisterStep } from '../_contexts/RegisterContext';
import { MenuAddModal } from '../_modals/MenuAddModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import { useRouter } from 'next/navigation';
import { NavigationPathname } from '@repo/entity/src/navigation';

export default function RegisterOperatingHoursPage() {
  const router = useRouter();

  const { push, pop } = useContext(PortalContext);

  const { storeData, completeStep, goToNextStep } = useRegister();

  const openOperatingHoursAddModal = () => {
    push('modal', {
      component: <MenuAddModal onClose={closeMenuAddModal} />,
    });
  };

  const closeMenuAddModal = () => {
    pop('modal');
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    completeStep(RegisterStep.MENU);
    goToNextStep();
    router.push(`${NavigationPathname.OwnerRegisterMenu}`);
  };

  const handlePrevStep = () => {
    router.back();
  };

  return (
    <form onSubmit={handleNextStep}>
      <div className="fixed bottom-4 left-0 right-0 mx-4 flex gap-x-2">
        <div></div>
        <button
          type="button"
          onClick={handlePrevStep}
          className="w-[20%] text-nowrap rounded-[6px] border border-[#B3B3B3] bg-white p-[10px]"
        >
          이전
        </button>
        <button
          type="submit"
          className="bg-primary-80 w-[80%] rounded-[6px] p-[10px] text-center text-[#412D00]"
        >
          다음
        </button>
      </div>
    </form>
  );
}
