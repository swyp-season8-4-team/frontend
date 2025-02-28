import { useEffect } from 'react';

export default function useMessageEvent<T>(
  handler: (data: T, source: MessageEventSource | null) => void
) {
  useEffect(() => {
    const wrapperHandler = (event: MessageEvent<T>) => {
      const { data, origin } = event;

      if (origin !== window.location.origin) {
        return;
      }

      handler(data, event.source);
    };

    window.addEventListener('message', wrapperHandler);

    return () => {
      window.removeEventListener('message', wrapperHandler);
    };
  }, [handler]);
}
