import type { MapController, MapPosition } from "@repo/entity/src/map";

export default class MapService {
  private readonly mapController: MapController | null;

  constructor({ mapController }: { mapController?: MapController }) {
    this.mapController = mapController ?? null;
  }

  async getCurrentPosition(): Promise<MapPosition> {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    return this.mapController.getCurrentPosition();
  }

  async initializeMap(container: HTMLDivElement) {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    const position = await this.getCurrentPosition();
    const map = await this.mapController.createMap(container, position);
    return map;
  }

  async addMarkersWithClustering(
    positions: MapPosition[],
    markerImageSrc: string
  ) {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    this.mapController.createMarkersWithClusterer(positions, markerImageSrc);
  }
}
