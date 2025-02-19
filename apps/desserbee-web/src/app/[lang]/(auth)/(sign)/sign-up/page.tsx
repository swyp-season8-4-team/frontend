import { getVerifyTokenAction } from "@/actions/getVerifyTokenAction";
import SignUpController from "./_components/SignUpController";

export default async function SignUpPage() {
  const verifyToken = await getVerifyTokenAction();

  return (
    <main className="px-4 pt-8 overflow-hidden">
      <div className="space-y-6">        
        <SignUpController token={verifyToken ?? null}/>
      </div>
    </main>
  );
}