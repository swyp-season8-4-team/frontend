import SignUpController from "./_components/SignUpController";

// 서버 컴포넌트
export default async function SignUpPage() {
  return (
    <main className="px-4 pt-8 overflow-hidden">
      <div className="space-y-6">        
        <SignUpController />
      </div>
    </main>
  );
}