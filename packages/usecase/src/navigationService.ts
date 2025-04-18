import type { I18NRepository } from '@repo/entity/src/i18n';
import {
  NavigationLanguageGroup,
  NavigationPathname,
} from '@repo/entity/src/navigation';

export default class NavigationService {
  private readonly i18nRepository: I18NRepository | null;

  constructor({ i18nRepository }: { i18nRepository?: I18NRepository }) {
    this.i18nRepository = i18nRepository ?? null;
  }

  /**
   * TODO: 서비스 로케일값 받아와서 href 반환하도록 수정
   * @param pathname
   * @returns
   */
  getHref(pathname: NavigationPathname): string {
    return `${NavigationLanguageGroup.ko}${pathname}`;
  }

  /**
   * 로그인 해야지만 접근 가능한 Path인지 확인하는 함수
   * @param {string} pathname 현재 페이지의 pathname
   * @returns {boolean} 로그인 해야지만 접근 가능한 Path인지 여부
   */
  isSignInServicePath(pathname: string): boolean {
    return (
      pathname.endsWith(NavigationPathname.Community) ||
      pathname.includes(NavigationPathname.CommunityDessertMate) ||
      pathname.includes(NavigationPathname.MateWrite) ||
      pathname.includes(NavigationPathname.My) ||
      pathname.includes(NavigationPathname.Owner)
    );
  }
}
