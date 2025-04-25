import { redirect } from 'next/navigation';

export const serverErrorActions: Record<string, () => void> = {
  A006: () => redirect('/sign-out'),
  A016: () => redirect('/sign-out'),
  A012: () => redirect('/sign-out'),
};
