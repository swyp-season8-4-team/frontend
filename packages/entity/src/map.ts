import type { NearByStoreData } from './store';

export interface MapPosition {
  latitude: number;
  longitude: number;
}

export interface ExternalMap {
  setCenter(position: MapPosition): void;
  setLevel(level: number): void;
  getCenter(): MapPosition;
  getLevel(): number;
  addMarkerWithName(
    position: MapPosition,
    markerImageSrc: string,
    name: string,
  ): void;
}

export interface MapController {
  createMap(
    container: HTMLDivElement,
    position: MapPosition,
  ): Promise<ExternalMap>;
  getMapBound(): { sw: MapPosition; ne: MapPosition };
  addCenterChangedListener(callback: () => void): void;
  createMarkersWithClusterer(
    storeMapData: NearByStoreData[],
    markerImageSrc: string,
    handleMarkerClick: (storeUuid: string) => void,
  ): void;
  createCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void;
  removeCurrentPositionMarker(): void;
  clearAllMarkers(): void;
  setMapCenter(position: MapPosition): void;
  setMapLevel(level: number): void;
  getMapCenter(): MapPosition;
  relayout(): void;
  removeAllEventListeners(): void;
  addMarkerWithName(
    position: MapPosition,
    markerImageSrc: string,
    name: string,
  ): void;
}
