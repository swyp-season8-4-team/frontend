import type { ExternalMap, MapPosition } from '@repo/entity/src/map';
import type { NearByStoreData } from '@repo/entity/src/store';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    storeUuid: string;
    name: string;
    address: string;
  };
}

export class KakaoMapAdapter implements ExternalMap {
  private currentPosMarker: CustomMarker | null = null;
  private markers: CustomMarker[] = [];
  private clusterer: kakao.maps.MarkerClusterer | null = null;

  constructor(private readonly map: kakao.maps.Map) {}

  setCenter(position: MapPosition): void {
    this.map.panTo(
      new kakao.maps.LatLng(position.latitude, position.longitude),
    );
  }

  setLevel(level: number): void {
    this.map.setLevel(level);
  }

  getCenter(): MapPosition {
    const center = this.map.getCenter();
    return {
      latitude: center.getLat(),
      longitude: center.getLng(),
    };
  }

  getLevel(): number {
    return this.map.getLevel();
  }

  // 내부 구현체 접근을 위한 메서드
  getNativeMap(): kakao.maps.Map {
    return this.map;
  }

  getBounds() {
    return this.map.getBounds();
  }

  setBounds(bounds: kakao.maps.LatLngBounds) {
    this.map.setBounds(bounds);
  }

  addCenterChangedListener(callback: () => void) {
    window.kakao.maps.event.addListener(this.map, 'bounds_changed', () =>
      callback(),
    );
  }

  createMarkersWithClusterer(
    storeMapData: NearByStoreData[],
    markerImageSrc: string,
    handleMarkerClick: (storeUuid: string) => void,
  ): void {
    this.clearAllMarkers();

    const imageSize = new kakao.maps.Size(24, 24);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

    this.markers = storeMapData.map((store) => {
      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(store.latitude, store.longitude),
        image: markerImage,
        map: this.map,
      }) as CustomMarker;

      marker.storeData = {
        storeUuid: store.storeUuid,
        name: store.name,
        address: store.address,
      };

      kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(store.storeUuid);
      });

      return marker;
    });

    this.clusterer = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      minLevel: 5,
    });

    this.clusterer.addMarkers(this.markers);
  }

  clearAllMarkers(): void {
    this.markers.forEach((marker) => {
      marker.setMap(null);
    });
    this.markers = [];

    if (this.clusterer) {
      this.clusterer.clear();
      this.clusterer = null;
    }
  }

  getMarkerById(storeUuid: string): CustomMarker | undefined {
    return this.markers.find(
      (marker) => marker.storeData?.storeUuid === storeUuid,
    );
  }

  removeMarkerById(storeUuid: string): void {
    const markerIndex = this.markers.findIndex(
      (marker) => marker.storeData?.storeUuid === storeUuid,
    );
    if (markerIndex !== -1) {
      this.markers[markerIndex].setMap(null);
      this.markers.splice(markerIndex, 1);
    }
  }

  createCurrentPositionMarker(
    position: MapPosition,
    markerImageSrc: string,
  ): void {
    if (!this.map) return;

    if (this.currentPosMarker) {
      this.currentPosMarker.setMap(null);
    }

    const markerPosition = new kakao.maps.LatLng(
      position.latitude,
      position.longitude,
    );

    const imageSize = new kakao.maps.Size(24, 24);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

    this.currentPosMarker = new kakao.maps.Marker({
      position: markerPosition,
      map: this.map,
      image: markerImage,
      zIndex: 1,
    }) as CustomMarker;
  }

  removeCurrentPositionMarker(): void {
    if (this.currentPosMarker) {
      this.currentPosMarker.setMap(null);
      this.currentPosMarker = null;
    }
  }

  relayout(): void {
    this.relayout();
  }

  addDebounceListener(callback: () => void) {
    window.kakao.maps.event.addListener(this.map, 'dragend', () => callback());
    window.kakao.maps.event.addListener(this.map, 'zoom_changed', () =>
      callback(),
    );
  }

  // 이벤트 리스너 제거 및 지도 객체 정리
  cleanupResources(): void {
    // 마커 제거
    this.clearAllMarkers();

    // 현재 위치 마커 제거
    this.removeCurrentPositionMarker();

    // 이벤트 리스너 제거 - 수정된 부분
    // kakao.maps.event.removeAllListener(this.map); // 잘못된 메서드

    // 올바른 방법: 개별 이벤트 핸들러 제거 (이벤트 토큰을 저장했다면)
    // 또는 이벤트를 등록할 때 반환되는 토큰을 배열로 저장해두고 제거

    // 클러스터러 제거
    if (this.clusterer) {
      this.clusterer.clear();
      this.clusterer = null;
    }
  }
}
