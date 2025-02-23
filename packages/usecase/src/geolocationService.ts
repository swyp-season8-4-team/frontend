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
  async getCurrentPosition(): Promise<MapPosition | GeolocationErrorMessage> {
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
          case 'unavailable':
            return {
              errorMessage:
                '위치 정보를 사용할 수 없습니다. GPS를 확인해주세요.',
            };
          case 'unknown':
            return {
              errorMessage: '알 수 없는 오류가 발생했습니다.',
            };
          default:
            return {
              errorMessage:
                '위치 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
            };
        }
      }
      return {
        errorMessage:
          '위치 정보 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
      };
    }
  }

  async startWatchingPosition(
    onSuccess: (position: MapPosition) => void,
    options?: PositionOptions,
  ): Promise<void> {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    this.geolocationController.startWatching(onSuccess, options);
  }

  async stopWatchingPosition() {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    return await this.geolocationController.stopWatching();
  }
}
