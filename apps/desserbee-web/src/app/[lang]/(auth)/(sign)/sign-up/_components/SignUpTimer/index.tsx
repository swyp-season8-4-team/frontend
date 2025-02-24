'use client';

import SessionStorageRepository from '@repo/infrastructures/src/repositories/SessionStorageRepository';
import AuthService, { EmailAuthSessionKey } from '@repo/usecase/src/authService';
import { useEffect, useState } from 'react';

const authService = new AuthService({
  storageRepository: new SessionStorageRepository(),
});

interface Props {
  onExpire?: () => void;
}

export default function SignUpTimer({ onExpire }: Props) {
  const [seconds, setSeconds] = useState(() => {
    const session = authService.getEmailAuthSession(EmailAuthSessionKey.SIGNUP);
    return session ? session.expirationTimes : 0;
  });

  useEffect(() => {
    if (seconds <= 0) {
      onExpire?.();
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        const newSeconds = prevSeconds - 1;
        
        // 세션 스토리지 업데이트
        const session = authService.getEmailAuthSession(EmailAuthSessionKey.SIGNUP);
        if (session) {
          authService.saveEmailAuthSession(EmailAuthSessionKey.SIGNUP, {
            ...session,
            expirationTimes: newSeconds
          });
        }

        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <span className="text-sm text-orange-500">
      {`${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`}
    </span>
  );
}