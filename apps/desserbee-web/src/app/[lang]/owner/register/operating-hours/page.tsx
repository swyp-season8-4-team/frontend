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

  const { storeData, completeStep, goToNextStep, updateOperatingHours } =
    useRegister();

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

  return (
    <form onSubmit={handleNextStep}>
      <div>
        <div></div>
        <div></div>
      </div>
      <div className="fixed bottom-4 left-0 right-0 mx-4">
        <button
          type="submit"
          className="bg-primary-80 w-full rounded-[6px] p-[10px] text-center font-semibold text-[#412D00]"
        >
          다음
        </button>
      </div>
    </form>
  );
}
