import { getVerifyTokenAction } from "@/actions/getVerifyTokenAction";
import SignUpController from "./_components/SignUpController";

export default async function SignUpPage() {
  const verifyToken = await getVerifyTokenAction();

  return (
    <main className="px-4 pt-8 overflow-hidden h-[100dvh]">
      <div className="flex flex-col mt-[48px] gap-6 h-full">        
        <SignUpController token={verifyToken ?? null}/>
      </div>
    </main>
  );
}