'use client';

import { useState, type ReactNode } from 'react';

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
  const [isVisible, setIsVisible] = useState(visible);

  const closeHandler = () => {
    setIsVisible(false);
    onClose?.();
  }
  
  return (
    <ModalContainer value={isVisible} onClose={closeHandler}>
      <div className="bg-white border border-[#f2f3f7] rounded-2xl flex flex-col gap-[46px] p-6 min-w-[360px] text-center sm:min-w-[330px]">
        <div className="flex justify-end">
          <IconButton 
            className="ml-auto" 
            onClick={closeHandler}
          >
            <IconX />
          </IconButton>
        </div>
        <span className="text-[#393939] text-center font-pretendard text-[26px] font-normal leading-[130%] tracking-[-0.78px]">
          {title}
        </span>
        {buttons}
      </div>
    </ModalContainer>
  );
}