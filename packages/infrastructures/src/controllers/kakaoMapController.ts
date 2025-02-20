import type { MapController, MapPosition } from '@repo/entity/src/map';
import type { NearByStoreData } from '@repo/entity/src/store';

import { KakaoMapAdapter } from '../adapters/kakaoMapAdapter';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    storeUuid: string;
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
    storeMapData: NearByStoreData[],
    markerImageSrc: string,
    handleMarkerClick: (storeUuid: string) => void,
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

  getMarkerById(storeUuid: string): CustomMarker | undefined {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    return this.map.getMarkerById(storeUuid);
  }

  createCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.createCurrentPositionMarker(position, markerImageSrc);
    this.map.setCenter(position);
  }

  removeCurrentPositionMarker(): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.removeCurrentPositionMarker();
  }

  setMapCenter(position: MapPosition) {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.setCenter(position);
  }

  relayout(): void {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.map.relayout();
  }
}
