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
  private centerChangedHandler:
    | ((event: kakao.maps.event.EventTarget) => void)
    | null = null;
  private dragEndHandler:
    | ((event: kakao.maps.event.EventTarget) => void)
    | null = null;
  private zoomChangedHandler:
    | ((event: kakao.maps.event.EventTarget) => void)
    | null = null;

  async createMap(container: HTMLDivElement, position: MapPosition) {
    try {
      const level = 3;
      const kakaoMap = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(position.latitude, position.longitude),
        level,
      });

      const zoomControl = new kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

      this.map = new KakaoMapAdapter(kakaoMap);
      return this.map;
    } catch (error) {
      throw error;
    }
  }

  addCenterChangedListener(callback: () => void) {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }

    this.centerChangedHandler = () => callback();
    kakao.maps.event.addListener(
      this.map.getNativeMap(),
      'bounds_changed',
      this.centerChangedHandler,
    );
  }

  createMarkersWithClusterer(
    storeMapData: NearByStoreData[],
    markerImageSrc: string,
    handleMarkerClick: (storeUuid: string) => void,
  ): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.createMarkersWithClusterer(
        storeMapData,
        markerImageSrc,
        handleMarkerClick,
      );
    } catch (error) {
      throw error;
    }
  }

  clearAllMarkers(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.clearAllMarkers();
    } catch (error) {
      throw error;
    }
  }

  getMarkerById(storeUuid: string): CustomMarker | undefined {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      const marker = this.map.getMarkerById(storeUuid);
      return marker;
    } catch (error) {
      throw error;
    }
  }

  createCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.createCurrentPositionMarker(position, markerImageSrc);
    } catch (error) {
      throw error;
    }
  }

  removeCurrentPositionMarker(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.removeCurrentPositionMarker();
    } catch (error) {
      throw error;
    }
  }

  setMapCenter(position: MapPosition) {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.setCenter(position);
    } catch (error) {
      throw error;
    }
  }

  getMapCenter() {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      const center = this.map.getCenter();
      return center;
    } catch (error) {
      throw error;
    }
  }

  getMapBound() {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      const bounds = this.map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      return {
        sw: { latitude: sw.getLat(), longitude: sw.getLng() },
        ne: { latitude: ne.getLat(), longitude: ne.getLng() },
      };
    } catch (error) {
      throw error;
    }
  }

  relayout(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.relayout();
    } catch (error) {
      throw error;
    }
  }

  removeAllEventListeners(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }

      if (this.centerChangedHandler) {
        kakao.maps.event.removeListener(
          this.map.getNativeMap(),
          'bounds_changed',
          this.centerChangedHandler,
        );
        this.centerChangedHandler = null;
      }

      if (this.dragEndHandler) {
        kakao.maps.event.removeListener(
          this.map.getNativeMap(),
          'dragend',
          this.dragEndHandler,
        );
        this.dragEndHandler = null;
      }

      if (this.zoomChangedHandler) {
        kakao.maps.event.removeListener(
          this.map.getNativeMap(),
          'zoom_changed',
          this.zoomChangedHandler,
        );
        this.zoomChangedHandler = null;
      }
    } catch (error) {
      throw error;
    }
  }
}
