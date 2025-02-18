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
  createMap(
    container: HTMLDivElement,
    position: MapPosition,
  ): Promise<ExternalMap>;
  createMarkersWithClusterer(
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
  ): void;
  createCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void;
  removeCurrentPositionMarker(): void;
  clearAllMarkers(): void;
  setMapCenter(position: MapPosition): void;
}
