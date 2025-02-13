export default class MetadataService {
  get title() {
    // TODO:
    return '';
  }

  get description() {
    // TODO:
    return '';
  }
  get permissionsPolicy() {
    const domain = process.env.NEXT_PUBLIC_APP_HOST;

    return `geolocation=(self '${domain}')`;
  }
}
