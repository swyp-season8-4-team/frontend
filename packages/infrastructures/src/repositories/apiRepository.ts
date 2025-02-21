export default abstract class APIRepository {
  protected get endpoint(): string {
    // return 'http://localhost:3000/api'; // TODO: 환경변수 설정
    return 'https://desserbee.com/api' as string;
  }
}
