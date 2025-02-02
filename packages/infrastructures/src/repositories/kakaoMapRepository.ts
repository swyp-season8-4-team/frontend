import type { MapRepository, Position, Map } from "@repo/entity/src/map";

import { KakaoMapAdapter } from "../adapters/kakaoMapAdapter";

export default class KakaoMapRepository implements MapRepository {
  private map: KakaoMapAdapter | null = null;

  async getCurrentPosition(): Promise<Position> {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 3000,
          maximumAge: 5000,
          enableHighAccuracy: false,
        });
      }
    );

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
  }

  async createMap(container: HTMLDivElement, position: Position) {
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

  private createCustomMarker(position: Position, src: string) {
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
      markerOptions.size.height
    );
    const imageOffset = {
      offset: new kakao.maps.Point(
        markerOptions.offset.x,
        markerOptions.offset.y
      ),
    };

    const markerImage = new kakao.maps.MarkerImage(src, imageSize, imageOffset);

    const markerPosition = new kakao.maps.LatLng(
      position.latitude,
      position.longitude
    );

    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    return marker;
  }

  createMarkersWithClusterer(positions: Position[], markerImageSrc: string) {
    if (!this.map) {
      throw new Error("Map is not initialized");
    }
    const kakaoMap = this.map.getNativeMap();
    const markers: kakao.maps.Marker[] = [];

    positions.forEach((position) => {
      const markerPosition = {
        latitude: position.latitude,
        longitude: position.longitude,
      };

      const marker = this.createCustomMarker(markerPosition, markerImageSrc);

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
}
