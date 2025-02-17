import type {
  GeolocationController,
  MapController,
  MapPosition,
} from '@repo/entity/src/map';
import type { StoreMapData } from '@repo/entity/src/store';

interface MapErrorMessage {
  errorMessage: string;
}

export default class MapService {
  private readonly mapController: MapController | null;
  private readonly geolocationController: GeolocationController | null;

  constructor({
    mapController,
    geolocationController,
  }: {
    mapController?: MapController;
    geolocationController?: GeolocationController;
  }) {
    this.mapController = mapController ?? null;
    this.geolocationController = geolocationController ?? null;
  }
  async getInitialPosition(): Promise<MapPosition | MapErrorMessage> {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

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
          position = await this.geolocationController.getInitialPosition();
          return position;
        case 'granted':
          position = await this.geolocationController.getInitialPosition();
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

  async getcurrentPosition(): Promise<MapPosition | MapErrorMessage> {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

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

  async addCurrentPositionMaker(position: MapPosition, markerImageSrc: string) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.createCurrentPosMarker(position, markerImageSrc);
  }

  stopWatchingPosition() {
    if (!this.geolocationController) {
      throw new Error('geolocationController is not set');
    }

    this.geolocationController.stopWatching();
  }

  async initializeMap(container: HTMLDivElement, currentPosition: MapPosition) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    const map = await this.mapController.createMap(container, currentPosition);
    return map;
  }

  async addMarkersWithClustering(
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMakerClick: (storeId: number) => void,
  ) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    this.mapController.createMarkersWithClusterer(
      storeMapData,
      markerImageSrc,
      handleMakerClick,
    );
  }

  async updateCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.updateCurrentPositionMarker(position, markerImageSrc);
  }
}
