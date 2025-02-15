import type { MapController, MapPosition } from '@repo/entity/src/map';

import { KakaoMapAdapter } from '../adapters/kakaoMapAdapter';
import type { StoreMapData } from '@repo/entity/src/store';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    id: number;
    name: string;
    address: string;
  };
}

export default class KakaoMapController implements MapController {
  private map: KakaoMapAdapter | null = null;

  getCurrentPosition(): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
              const latitude = 37.498095;
              const longitude = 127.028979;
              resolve({ latitude, longitude });
            } else {
              const latitude = pos.coords.latitude;
              const longitude = pos.coords.longitude;
              resolve({ latitude, longitude });
            }
          },
          (err) => {
            if (err.code === 3) {
              reject(new Error('delayed'));
            }
            if (err.code === 1) {
              reject(new Error('blocked'));
            }
            reject(err);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 180000,
            timeout: 7000,
          },
        );
      } else {
        reject(new Error('notSupport'));
      }
    });
  }

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

  private createCustomMarker(position: MapPosition, src: string) {
    const markerOptions = {
      size: {
        width: 30,
        height: 30,
      },
      offset: {
        x: 0,
        y: 0,
      },
    };

    const imageSize = new kakao.maps.Size(
      markerOptions.size.width,
      markerOptions.size.height,
    );
    const imageOffset = {
      offset: new kakao.maps.Point(
        markerOptions.offset.x,
        markerOptions.offset.y,
      ),
    };

    const markerImage = new kakao.maps.MarkerImage(src, imageSize, imageOffset);

    const markerPosition = new kakao.maps.LatLng(
      position.latitude,
      position.longitude,
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    }) as CustomMarker;

    return marker;
  }

  createMarkersWithClusterer(
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
  ) {
    if (!this.map) {
      throw new Error('Map is not initialized');
    }
    const kakaoMap = this.map.getNativeMap();
    const markers: CustomMarker[] = [];

    storeMapData.forEach(({ id, name, address, latitude, longitude }) => {
      const markerPosition = {
        latitude: latitude,
        longitude: longitude,
      };

      const marker = this.createCustomMarker(markerPosition, markerImageSrc);

      marker.storeData = {
        id,
        name,
        address,
      };

      kakao.maps.event.addListener(marker, 'click', function () {
        handleMarkerClick(id);
      });

      markers.push(marker);
      marker.setMap(kakaoMap);
    });

    const clusterOptions = {
      map: kakaoMap, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 7, // 클러스터 할 최소 지도 레벨
    };

    const clusterer = new kakao.maps.MarkerClusterer(clusterOptions);

    // 클러스터러에 마커들을 추가
    clusterer.addMarkers(markers);
  }

  destroyMap() {
    if (this.map) {
      this.map = null;
    }
  }
}
