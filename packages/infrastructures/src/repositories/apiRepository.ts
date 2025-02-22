const origin =
  process.env.NEXT_PUBLIC_APP_ENV !== 'prod'
    ? 'http://localhost:3000'
    : 'https://www.desserbee.com';

export default abstract class APIRepository {
  protected get endpoint(): string {
    return `${origin}/api`;
  }
}
