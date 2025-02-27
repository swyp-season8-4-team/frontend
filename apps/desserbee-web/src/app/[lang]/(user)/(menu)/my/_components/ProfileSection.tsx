'use client';

import Image from 'next/image';
import { useContext } from 'react';
import { UserContext } from '@/contexts/UserContext';

export default function ProfileSection() {
  const { user } = useContext(UserContext); 
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20 mb-3">
        <Image
          src={user?.profileImageUrl || '/images/default-profile.png'}
          alt="my-page-profile-image"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-800">{user?.nickname || '디저트 러브님'}</h3>
    </div>
  );
} 