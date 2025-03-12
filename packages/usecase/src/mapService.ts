import type { MapController, MapPosition } from '@repo/entity/src/map';
import type { StorageRepository } from '@repo/entity/src/storage';
import type { NearByStoreData } from '@repo/entity/src/store';

export default class MapService {
  private readonly mapController: MapController | null;
  private readonly storageRepository: StorageRepository | null;

  constructor({
    mapController,
    storageRepository,
  }: {
    mapController?: MapController;
    storageRepository?: StorageRepository;
  }) {
    this.mapController = mapController ?? null;
    this.storageRepository = storageRepository ?? null;
  }

  //TODO: 현재는 SessionStorage로 지도 마지막 조회 장소 저장, 후에 지도 한번만 로드해서 세션 유지되도록 수정
  setLastPostion(currentMapPosition: MapPosition) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    this.storageRepository.set('lastPosition', currentMapPosition);
  }

  getLastPosition() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    } else if (!this.storageRepository) {
      throw new Error('storageRepository is not set');
    }

    return this.storageRepository.get('lastPosition') as MapPosition;
  }

  async addCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.createCurrentPositionMarker(position, markerImageSrc);
  }

  async initializeMap(container: HTMLDivElement, currentPosition: MapPosition) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    const map = await this.mapController.createMap(container, currentPosition);
    return map;
  }

  async addMarkersWithClustering(
    storeMapData: NearByStoreData[],
    markerImageSrc: string,
    handleMakerClick: (storeUuid: string) => void,
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
    this.mapController.createCurrentPositionMarker(position, markerImageSrc);
  }

  async removeCurrentPositionMarker() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.removeCurrentPositionMarker();
  }

  async setMapCenter(position: MapPosition) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.setMapCenter(position);
  }

  addCenterChangedListener(callback: () => void) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    return this.mapController.addCenterChangedListener(callback);
  }

  getMapCenter() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    return this.mapController.getMapCenter();
  }

  getMapBound() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    return this.mapController.getMapBound();
  }

  setMapLevel(level: number) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    return this.mapController.setMapLevel(level);
  }

  async clearAllMarkers() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.clearAllMarkers();
  }

  removeAllEventListeners() {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.removeAllEventListeners();
  }

  async addMarkerWithName(
    position: MapPosition,
    markerImageSrc: string,
    name: string,
  ) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }

    this.mapController.addMarkerWithName(position, markerImageSrc, name);
  }
}
