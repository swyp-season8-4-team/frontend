import { getVerifyTokenAction } from '@/actions/getVerifyTokenAction';
import SignUpController from './_components/SignUpController';

export default async function SignUpPage() {
  const verifyToken = await getVerifyTokenAction();

  return (
    <main className="px-4 flex flex-col flex-1 mt-[56px] gap-[12px] overflow-hidden">
      <SignUpController token={verifyToken ?? null} />
    </main>
  );
}
