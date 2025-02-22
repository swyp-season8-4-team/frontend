import { isServer } from "@repo/api";

export default abstract class APIRepository {
  protected get endpoint(): string {
    if (!isServer) {
      return `${window.location.origin}/api`;
    }

    // FIXME: origin 환경변수로 고치기
    const origin =
      process.env.NEXT_PUBLIC_APP_ENV !== 'prod'
        ? 'http://localhost:3000'
        : 'https://frontend-desserbee-web-git-vercel-test-eepyzs-projects.vercel.app';

    return `${origin}/api`;
  }
}
