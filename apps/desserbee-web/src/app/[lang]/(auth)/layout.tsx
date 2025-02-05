import type { WithChildren } from "@repo/ui/index";
import AuthService from "@repo/usecase/src/authService";
import AuthNextAppRouteRepository from "@repo/infrastructures/src/repositories/authNextAppRouteRepository";
import { redirect } from "next/navigation";
import { NavigationPathname } from "@repo/entity/src/navigation";

const authService = new AuthService({
  authRepository: new AuthNextAppRouteRepository(),
});

export default async function AuthLayout({ children }: WithChildren) {
  const authorization = await authService.getAuthorization();

  if (authorization) {
    redirect(NavigationPathname.Map);
  }

  return <>{children}</>;
}
