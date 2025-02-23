import { isServer } from "@repo/api";

export default abstract class APIRepository {
  protected get endpoint(): string {
    let origin = '';

    if (process.env.NEXT_PUBLIC_APP_ENV === 'local') {
      origin = process.env.NEXT_PUBLIC_APP_HOST ?? '';
    } else {
      origin = process.env.NEXT_PUBLIC_SERVICE_API_URL ?? '';
    }

    return `${origin}/api`;
  }
}
