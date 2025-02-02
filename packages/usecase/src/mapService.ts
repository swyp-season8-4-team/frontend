import type { MapRepository, Position } from "@repo/entity/src/map";

export default class MapService {
  private readonly mapRepository: MapRepository | null;

  constructor({ mapRepository }: { mapRepository?: MapRepository }) {
    this.mapRepository = mapRepository ?? null;
  }

  async getCurrentPosition(): Promise<Position> {
    if (!this.mapRepository) {
      throw new Error("mapRepository is not set");
    }

    return this.mapRepository.getCurrentPosition();
  }

  async initializeMap(container: HTMLDivElement) {
    if (!this.mapRepository) {
      throw new Error("mapRepository is not set");
    }

    const position = await this.getCurrentPosition();
    const map = await this.mapRepository.createMap(container, position);
    return map;
  }

  async addMarkersWithClustering(
    positions: Position[],
    markerImageSrc: string
  ) {
    if (!this.mapRepository) {
      throw new Error("mapRepository is not set");
    }

    this.mapRepository.createMarkersWithClusterer(positions, markerImageSrc);
  }
}
