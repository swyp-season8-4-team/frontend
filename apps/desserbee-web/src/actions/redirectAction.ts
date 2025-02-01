import { redirect } from "next/navigation";

export default async function redirectAction(url: string) {
  redirect(url);
}
