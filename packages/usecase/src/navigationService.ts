import { NavigationPathname } from "@repo/entity/src/navigation";

export default class NavigationService {
  /**
   * 로그인 해야지만 접근 가능한 Path인지 확인하는 함수
   * @param {string} pathname 현재 페이지의 pathname
   * @returns {boolean} 로그인 해야지만 접근 가능한 Path인지 여부
   */
  isSignInServicePath(pathname: string): boolean {
    if (
      pathname.includes(NavigationPathname.CommunityDessertMate) ||
      pathname.includes(NavigationPathname.MateWrite) ||
      pathname.includes(NavigationPathname.My)
    ) {
      return true;
    }
    return false;
  }
}
