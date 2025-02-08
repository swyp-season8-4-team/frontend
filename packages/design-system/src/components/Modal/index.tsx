'use client';
import { type ReactNode } from 'react';

import HTMLTag from '@repo/ui/components/HTMLTag';
import IconX from '../icons/IconX';
import withModal from '../../hocs/withModal';
import IconButton from '../buttons/IconButton';

interface Props {
  visible: boolean;
  buttons: ReactNode;
  title: string;
  description?: string;
  onClose?: () => void;
}

const ModalContainer = withModal(HTMLTag);

export default function Modal({ visible, buttons, title, onClose }: Props) {
  return (
    <ModalContainer value={visible} onClose={onClose}>
      <div className="bg-white border border-[#f2f3f7] rounded-2xl flex flex-col gap-[46px] p-6 min-w-[360px] text-center sm:min-w-[330px]">
        <div className="flex justify-between">
          <span className="text-[#000000] text-xl font-bold leading-[23.87px]">
            {title}
          </span>
          <IconButton 
            className="ml-auto" 
            onClick={onClose}
          >
            <IconX />
          </IconButton>
        </div>
        <div className="flex justify-end items-center self-stretch gap-2">
          {buttons}
        </div>
      </div>
    </ModalContainer>
  );
}