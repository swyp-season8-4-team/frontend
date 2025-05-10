'use client';

import dynamic from 'next/dynamic';
const GoOwnerPageModal = dynamic(
  () => import('../../_modals/GoOwnerPageModal'),
  {
    ssr: false,
  },
);

export function GoOwnerModalContainer() {
  return (
    <>
      <GoOwnerPageModal />
    </>
  );
}
