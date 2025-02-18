import type { MapController, MapPosition } from '@repo/entity/src/map';
import type { StoreMapData } from '@repo/entity/src/store';

export default class MapService {
  private readonly mapController: MapController | null;

  constructor({ mapController }: { mapController?: MapController }) {
    this.mapController = mapController ?? null;
  }

  async addCurrentPositionMaker(position: MapPosition, markerImageSrc: string) {
    if (!this.mapController) {
      throw new Error('mapController is not set');
    }
    this.mapController.createCurrentPosMarker(position, markerImageSrc);
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
