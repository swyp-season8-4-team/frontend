import type { WithSearchParams } from "@/app";
import LoginForm from "./_components/LoginForm";
import { encrypt } from "@/utils/crypto";

export default async function SignInPage({ searchParams }: WithSearchParams) {
  const { next } = await searchParams;

  const state = encrypt(`${next}:${Date.now()}`);

  return <LoginForm state={state} />;
}
