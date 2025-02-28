export default class MetadataService {
  
  private get permissionsPolicy() {
    const domain = process.env.NEXT_PUBLIC_APP_HOST;

    return `geolocation=(self '${domain}')`;
  }

  get title() {
    return '디저비 - 당신의 취향을 가장 잘 아는 디저트 발견 플랫폼';
  }

  get description() {
    return '우리 동네 숨은 디저트 맛집과 요즘 핫한 인기 디저트까지 한눈에, 디저비에서 쉽게 찾아보세요! 취향 필터링으로 나에게 딱 맞는 디저트를 발견하고, 나와 비슷한 취향을 가진 디저트메이트까지! 지금 바로 디저비에서 만나요!';
  }

  get other() {
    return {
      'permissions-policy': this.permissionsPolicy,
    };
  }
}
