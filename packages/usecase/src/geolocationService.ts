import type { MapPosition } from '@repo/entity/src/map';
import type { GeolocationController } from '@repo/entity/src/geolocation';

interface GeolocationErrorMessage {
  errorMessage: string;
  errorType: string;
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
      console.error('[GeolocationService] 컨트롤러가 초기화되지 않음');
      throw new Error('geolocationController is not set');
    }

    try {
      console.log('[GeolocationService] 위치 권한 확인 시작');
      const permissionStatus = await navigator.permissions.query({
        name: 'geolocation',
      });
      console.log(
        '[GeolocationService] 현재 위치 권한 상태:',
        permissionStatus.state,
      );

      let position;
      switch (permissionStatus.state) {
        case 'denied':
          console.log('[GeolocationService] 위치 권한이 거부됨');
          return {
            errorMessage: '위치 권한 허용 후 서비스 이용이 가능합니다.',
            errorType: 'PERMISSION_DENIED',
          };
        case 'prompt':
        case 'granted':
          console.log('[GeolocationService] 위치 정보 요청 시작');
          position = await this.geolocationController.getCurrentPosition();
          console.log('[GeolocationService] 위치 정보 획득 성공', position);
          return position;
      }
    } catch (error) {
      console.error('[GeolocationService] 오류 발생:', error);

      if (error instanceof Error) {
        switch (error.message) {
          case 'delayed':
            return {
              errorMessage: '위치 정보를 가져오는데 시간이 너무 오래 걸립니다.',
              errorType: 'TIMEOUT',
            };
          case 'blocked':
            return {
              errorMessage: '위치 정보 접근 권한이 없습니다.',
              errorType: 'PERMISSION_DENIED',
            };
          case 'notSupport':
            return {
              errorMessage: '이 브라우저는 위치 정보 기능을 지원하지 않습니다.',
              errorType: 'NOT_SUPPORTED',
            };
          case 'unavailable':
            return {
              errorMessage:
                '위치 정보를 사용할 수 없습니다. GPS를 확인해주세요.',
              errorType: 'POSITION_UNAVAILABLE',
            };
          case 'unknown':
            return {
              errorMessage: '알 수 없는 오류가 발생했습니다.',
              errorType: 'UNKNOWN_ERROR',
            };
          default:
            return {
              errorMessage:
                '위치 정보를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.',
              errorType: 'UNKNOWN_ERROR',
            };
        }
      }
      return {
        errorMessage:
          '위치 정보 서비스에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
        errorType: 'UNKNOWN_ERROR',
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
