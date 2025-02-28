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
    try {
      const level = 3;
      const kakaoMap = new kakao.maps.Map(container, {
        center: new kakao.maps.LatLng(position.latitude, position.longitude),
        level,
      });

      const zoomControl = new kakao.maps.ZoomControl();
      kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

      this.map = new KakaoMapAdapter(kakaoMap);
      console.log('지도가 성공적으로 생성되었습니다.');
      return this.map;
    } catch (error) {
      console.error('지도 생성 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  addCenterChangedListener(callback: () => void) {
    this.map?.addCenterChangedListener(callback);
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
      console.log(
        `${storeMapData.length}개의 마커가 성공적으로 생성되었습니다.`,
      );
    } catch (error) {
      console.error('마커 생성 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  clearAllMarkers(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.clearAllMarkers();
      console.log('모든 마커가 성공적으로 제거되었습니다.');
    } catch (error) {
      console.error('마커 제거 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  getMarkerById(storeUuid: string): CustomMarker | undefined {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      const marker = this.map.getMarkerById(storeUuid);
      console.log(`마커 조회 완료 - ID: ${storeUuid}`);
      return marker;
    } catch (error) {
      console.error(
        `마커 조회 중 오류가 발생했습니다 (ID: ${storeUuid}):`,
        error,
      );
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
      this.map.setCenter(position);
      console.log('현재 위치 마커가 성공적으로 생성되었습니다.');
    } catch (error) {
      console.error('현재 위치 마커 생성 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  removeCurrentPositionMarker(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.removeCurrentPositionMarker();
      console.log('현재 위치 마커가 성공적으로 제거되었습니다.');
    } catch (error) {
      console.error('현재 위치 마커 제거 중 오류가 발생했습니다:', error);
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
      console.error('지도 중심 좌표를 가져오는 중 오류가 발생했습니다:', error);
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

      console.log('지도 경계를 성공적으로 가져왔습니다.');
      return {
        sw: { latitude: sw.getLat(), longitude: sw.getLng() },
        ne: { latitude: ne.getLat(), longitude: ne.getLng() },
      };
    } catch (error) {
      console.error('지도 경계를 가져오는 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  relayout(): void {
    try {
      if (!this.map) {
        throw new Error('Map is not initialized');
      }
      this.map.relayout();
      console.log('지도 레이아웃이 성공적으로 재조정되었습니다.');
    } catch (error) {
      console.error('지도 레이아웃 재조정 중 오류가 발생했습니다:', error);
      throw error;
    }
  }

  // getBounds(): {
  //   sw: MapPosition;
  //   ne: MapPosition;
  // } {
  //   if (!this.map) {
  //     throw new Error('Map is not initialized');
  //   }

  //   const bounds = this.map.getBounds();
  //   const sw = bounds.getSouthWest();
  //   const ne = bounds.getNorthEast();

  //   return {
  //     sw: {
  //       latitude: sw.getLat(),
  //       longitude: sw.getLng(),
  //     },
  //     ne: {
  //       latitude: ne.getLat(),
  //       longitude: ne.getLng(),
  //     },
  //   };
  // }

  // getVisibleArea(): {
  //   center: MapPosition;
  //   level: number;
  // } {
  //   if (!this.map) {
  //     throw new Error('Map is not initialized');
  //   }

  //   const map = this.map;
  //   const center = map.getCenter();
  //   const level = map.getLevel();

  //   return {
  //     center: {
  //       latitude: center.latitude,
  //       longitude: center.longitude,
  //     },
  //     level: level,
  //   };
  // }

  // setBounds(positions: MapPosition[]): void {
  //   if (!this.map) {
  //     throw new Error('Map is not initialized');
  //   }

  //   const bounds = new kakao.maps.LatLngBounds();

  //   positions.forEach((pos) => {
  //     bounds.extend(new kakao.maps.LatLng(pos.latitude, pos.longitude));
  //   });

  //   this.map.setBounds(bounds);
  // }
}
