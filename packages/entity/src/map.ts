export interface MapPosition {
  latitude: number;
  longitude: number;
}

export interface ExternalMap {
  setCenter(position: MapPosition): void;
  setLevel(level: number): void;
  getCenter(): MapPosition;
  getLevel(): number;
}

export interface MapController {
  getCurrentPosition(): Promise<MapPosition>;
  createMap(
    container: HTMLDivElement,
    position: MapPosition,
  ): Promise<ExternalMap>;
  createMarkersWithClusterer(
    positions: MapPosition[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
  ): void;
  destroyMap(): void;
}
