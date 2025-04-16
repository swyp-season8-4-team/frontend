import { getVerifyTokenAction } from '@/actions/getVerifyTokenAction';
import SignUpController from './_components/SignUpController';

export default async function SignUpPage() {
  const verifyToken = await getVerifyTokenAction();

  return (
    <main>
      <SignUpController token={verifyToken ?? null} />
    </main>
  );
}
