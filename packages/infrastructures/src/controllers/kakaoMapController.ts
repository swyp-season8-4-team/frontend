import type { MapController, MapPosition } from '@repo/entity/src/map';
import type { StoreMapData } from '@repo/entity/src/store';

import { KakaoMapAdapter } from '../adapters/kakaoMapAdapter';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    id: number;
    name: string;
    address: string;
  };
}

export default class KakaoMapController implements MapController {
  private map: KakaoMapAdapter | null = null;

  async createMap(container: HTMLDivElement, position: MapPosition) {
    const level = 3;
    const kakaoMap = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(position.latitude, position.longitude),
      level,
    });

    const zoomControl = new kakao.maps.ZoomControl();
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

    this.map = new KakaoMapAdapter(kakaoMap);
    return this.map;
  }

  createMarkersWithClusterer(
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
  ): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.createMarkersWithClusterer(
      storeMapData,
      markerImageSrc,
      handleMarkerClick,
    );
  }

  clearAllMarkers(): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.clearAllMarkers();
  }

  getMarkerById(storeId: number): CustomMarker | undefined {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    return this.map.getMarkerById(storeId);
  }

  createCurrentPosMarker(position: MapPosition, markerImageSrc: string): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.createCurrentPosMarker(position, markerImageSrc);
  }

  updateCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.updateCurrentPositionMarker(position, markerImageSrc);
  }

  removeCurrentPosMarker(): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.removeCurrentPositionMarker();
  }
}
