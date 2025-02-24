import { ForgotPasswordController } from "./_components/ForgotPasswordController";

export default async function ForgotPasswordPage() {
  return (
    <main className="px-4 pt-8 overflow-hidden h-[100dvh]">
      <div className="flex flex-col mt-[48px] gap-6 h-full">
        <ForgotPasswordController />
      </div>
    </main>
  )
}
