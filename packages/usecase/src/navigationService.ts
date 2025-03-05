import { NavigationPathname } from "@repo/entity/src/navigation";

export default class NavigationService {
  isSignInServicePath(pathname: string): boolean {
    return pathname.includes(NavigationPathname.Community);
  }
}
