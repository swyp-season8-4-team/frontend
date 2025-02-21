export default abstract class APIRepository {
  protected get endpoint(): string {
    if (process.env.NEXT_PUBLIC_APP_ENV !== 'prod') {
      return 'http://localhost:3000/api';
    }
    return process.env.CLIENT_API_URL as string;
  }
}
