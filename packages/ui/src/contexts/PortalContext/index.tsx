'use client';

import {
  createContext,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { WithChildren } from '../..';

export const MODAL_PORTAL_CONTAINER_ID = 'modal-portal-container';

type PortalType = 'modal';

interface PortalConfig {
  component: React.ReactNode;
  multiple?: boolean;
}

interface State {
  clear: () => void;
  push: (portalType: PortalType, config: PortalConfig) => void;
  pop: (portalType: PortalType) => void;
}

const defaultState: State = {
  clear() {},
  push() {},
  pop() {},
};

export const PortalContext = createContext<State>(defaultState);

export function PortalProvider({ children }: WithChildren) {
  const portalQueuesRef = useRef<Record<PortalType, PortalConfig[]>>({
    modal: [],
  });

  const pop = useCallback((portalType: PortalType) => {
    portalQueuesRef.current[portalType].pop();
    window.dispatchEvent(new CustomEvent(`${portalType}-update`));
  }, []);

  const push = useCallback((portalType: PortalType, config: PortalConfig) => {
    if (!config.multiple && portalQueuesRef.current[portalType].length > 0) {
      portalQueuesRef.current[portalType].pop();
    }

    portalQueuesRef.current[portalType].push(config);
    window.dispatchEvent(new CustomEvent(`${portalType}-update`));
  }, []);

  const clear = useCallback(() => {
    portalQueuesRef.current = {
      modal: [],
    };
  }, []);

  return (
    <PortalContext.Provider value={{ push, pop, clear }}>
      {children}
      <div id={MODAL_PORTAL_CONTAINER_ID} />
      <PortalRenderer
        portalType="modal"
        queue={portalQueuesRef.current.modal}
      />
    </PortalContext.Provider>
  );
}

interface PortalRendererProps {
  portalType: PortalType;
  queue: PortalConfig[];
}

function PortalRenderer({ portalType, queue }: PortalRendererProps) {
  const [, setForceUpdate] = useState(false);

  // FIXME: 더 좋은 방법 없을까?
  useEffect(() => {
    const updateQueue = () => setForceUpdate((prev) => !prev);

    window.addEventListener(`${portalType}-update`, updateQueue);

    return () =>
      window.removeEventListener(`${portalType}-update`, updateQueue);
  }, [portalType]);

  return queue.map((config, index) => (
    <Fragment key={`${portalType}-${index}`}>{config.component}</Fragment>
  ));
}
