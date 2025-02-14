'use client';

import { cn } from '@repo/ui/lib/utils';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import {
  type ComponentType,
  type MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface Props {
  closeOnOutside?: boolean;
  modalClassName?: string;
  dimClassName?: string;
  value: boolean;
  onClose?(): void;
}

export default function withModal<P extends object>(
  Component: ComponentType<P>,
) {
  function WrapperComponent({
    closeOnOutside = true,
    modalClassName,
    dimClassName,
    value,
    onClose,
    ...props
  }: P & Props) {
    const { pop } = useContext(PortalContext);
    const dimRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const [portalElement, setPortalElement] = useState<Element | null>(null);
    const [show, setShow] = useState(value);

    const closeAnimation = useCallback(() => {
      if (dimRef.current && modalRef.current) {
        modalRef.current.onanimationend = () => {
          setShow(false);
          onClose?.();
          pop('modal');
        };
        dimRef.current.classList.add('animate-fadeOut');
        modalRef.current.classList.add('animate-fadeOut');
      } else {
        setShow(false);
        pop('modal');
      }
    }, [onClose]);

    const dimClickHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (show && closeOnOutside) {
        closeAnimation();
      }
    };

    useEffect(() => {
      if (!value) {
        closeAnimation();
      }
    }, [closeAnimation, value]);

    useEffect(() => {
      setPortalElement(document.getElementById('modal-portal-container'));
    }, [show]);

    return show && portalElement
      ? createPortal(
          <section className="fixed inset-0 flex items-center justify-center w-screen h-screen h-[100dvh] z-[var(--modal-z-index)]">
            <div
              ref={dimRef}
              className={cn('fixed inset-0 bg-black/50 z-[var(--background-z-index)] opacity-0 animate-fadeIn', dimClassName)}
              onClick={dimClickHandler}
            />
            <div
              ref={modalRef}
              className={cn('flex flex-col items-start gap-6 max-w-[var(--modal-max-width)] p-4 rounded-2xl opacity-0 z-[var(--modal-z-index)] animate-fadeIn', modalClassName)}
            >
              <Component {...(props as P)} />
            </div>
          </section>,
          portalElement,
        )
      : null;
  }
  
  WrapperComponent.displayName = `withModal${
    Component.displayName ? `-${Component.displayName}` : ''
  }`;

  return WrapperComponent;
}