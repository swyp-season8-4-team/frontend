import { ForgotPasswordController } from './_components/ForgotPasswordController';

export default async function ForgotPasswordPage() {
  return (
    <main className="h-[100dvh] overflow-y-scroll px-4 py-[30px]">
      <div className="flex h-full flex-col gap-6">
        <ForgotPasswordController />
      </div>
    </main>
  );
}
