export default abstract class APIRepository {
  protected get endpoint(): string {
    return `${window.location.origin}/api`;
  }
}
