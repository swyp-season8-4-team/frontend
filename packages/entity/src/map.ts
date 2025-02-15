import type { StoreMapData } from './store';

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
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
  ): void;
  destroyMap(): void;
}
