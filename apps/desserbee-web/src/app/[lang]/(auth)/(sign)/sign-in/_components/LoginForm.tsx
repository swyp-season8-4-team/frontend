'use client';

import { loginAction } from "@/actions/loginAction";
import { NavigationLanguageGroup, NavigationPathGroup, NavigationPathname } from "@repo/entity/src/navigation";
import type { WithChildren, WithClassName } from "@repo/ui/index";
import { useRouter } from "next/navigation";

export default function LoginForm({ className, children }: WithClassName & WithChildren) {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await loginAction(formData);
    if (!response) {
      return;
    }

    const pathname = !response.isPreferencesSet
      ? `${NavigationLanguageGroup.ko}${NavigationPathGroup.Preference}${response.userUuid}`
      : `${NavigationLanguageGroup.ko}${NavigationPathname.Map}`;
    router.replace(pathname);
  }
  
  return (
    <form className={className} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}