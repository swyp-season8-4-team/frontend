export default abstract class APIRepository {
  protected get endpoint(): string {
    const endpoint = process.env.NEXT_PUBLIC_SERVICE_API_URL;
    if (!endpoint) {
      throw new Error('NEXT_PUBLIC_SERVICE_API_URL is not set');
    }

    return endpoint;
  }
}
