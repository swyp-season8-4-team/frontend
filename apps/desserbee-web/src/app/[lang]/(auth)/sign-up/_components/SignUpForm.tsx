'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PasswordInput from './PasswordInput';

export default function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    nickname: ''
  });

  // ... validation 함수들

  const handleSubmit = async (e: React.FormEvent) => {
    // ... submit 로직
  };

  const handleCancel = () => {
    // ... cancel 로직
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일
        </label>
        <div className="mt-1">
          <input
            id="email"
            type="email"
            required
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <PasswordInput
        value={formData.password}
        onChange={(value) => setFormData({ ...formData, password: value })}
        error={errors.password}
      />

      {/* ... 나머지 form 필드들 */}
    </form>
  );
}
