import type { MapPosition } from '@repo/entity/src/map';
import type { GeolocationController } from '@repo/entity/src/geolocation';

interface GeolocationErrorMessage {
  errorMessage: string;
}

export default class GeolocationService {
  private readonly geolocationController: GeolocationController | null;

  constructor({
    geolocationController,
  }: {
    geolocationController?: GeolocationController;
  }) {
    this.geolocationController = geolocationController ?? null;
  }
  async getInitialPosition(): Promise<MapPosition | GeolocationErrorMessage> {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation',
      });

      let position;
      switch (permissionStatus.state) {
        case 'denied':
          return {
            errorMessage: '위치 권한 허용 후 서비스 이용이 가능합니다.',
          };
        case 'prompt':
          position = await this.geolocationController.getCurrentPosition();
          return position;
        case 'granted':
          position = await this.geolocationController.getCurrentPosition();
          return position;
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case 'delayed':
            return {
              errorMessage: '위치 정보를 가져오는데 시간이 너무 오래 걸립니다.',
            };
          case 'blocked':
            return {
              errorMessage: '위치 정보 접근 권한이 없습니다.',
            };
          case 'notSupport':
            return {
              errorMessage: '이 브라우저는 위치 정보 기능을 지원하지 않습니다.',
            };
          default:
            return { errorMessage: error.message };
        }
      }
      return { errorMessage: String(error) };
    }
  }

  getWatchingPostion(options?: PositionOptions): Promise<MapPosition> {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    return this.geolocationController.startWatching(options);
  }

  stopWatchingPosition() {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    this.geolocationController.stopWatching();
  }
}
