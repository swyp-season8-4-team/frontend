'use client';

import { UserContext } from '@/contexts/UserContext';
import { useContext } from 'react';

export default function CommunityNickName() {
  const { user } = useContext(UserContext);
  return <span className="text-primary-60 font-medium">{user?.nickname}</span>;
}
