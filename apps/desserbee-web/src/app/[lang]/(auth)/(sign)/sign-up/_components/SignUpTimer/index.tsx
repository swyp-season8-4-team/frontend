'use client';

import SessionStorageRepository from '@repo/infrastructures/src/repositories/sessionStorageRepository';
import AuthService, {
  EmailAuthSessionKey,
} from '@repo/usecase/src/authService';
import { useEffect, useState } from 'react';

const authService = new AuthService({
  storageRepository: new SessionStorageRepository(),
});

interface Props {
  onExpire?: () => void;
  expirationTime: number;
}

export default function SignUpTimer({ onExpire, expirationTime }: Props) {
  const [seconds, setSeconds] = useState(expirationTime);

  useEffect(() => {
    setSeconds(expirationTime);
  }, [expirationTime]);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span className="text-error-60 text-xs">
      {`${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`}
    </span>
  );
}
