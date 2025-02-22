export default abstract class APIRepository {
  protected get endpoint(): string {
    // 클라이언트 사이드에서는 상대 경로를 사용하여 자동으로 현재 호스트의 /api로 요청
    // 서버 사이드에서는 전체 URL 사용
    if (typeof window === 'undefined') {
      // 서버 사이드
      return process.env.NEXT_PUBLIC_SERVICE_API_URL as string;
    }
    // 클라이언트 사이드
    return '/api';
  }
}
