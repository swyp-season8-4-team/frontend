import type { ExternalMap, MapPosition } from '@repo/entity/src/map';
import type {
  NearByStoreData,
  SavedStoresLocationData,
} from '@repo/entity/src/store';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    storeUuid: string;
    name: string;
    address: string;
  };
  overlay?: kakao.maps.CustomOverlay;
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

      // 커스텀 오버레이 추가
      const content = `<div style="
                        padding: 1px 2px;
                        background-color: white;
                        border-radius: 8px;
                        font-size: 13px;
                        font-weight: 600;
                        color: #333;
                        text-align: center;
                        white-space: nowrap;
                        transform: translateY(-5px);
                        border: 1px solid #eee;
                        max-width: 150px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                      ">${store.name}</div>`;
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: marker.getPosition(),
        yAnchor: 0.1,
        zIndex: -1,
      });

      marker.overlay = overlay;

      const updateOverlayVisibility = () => {
        const currentLevel = this.map.getLevel();
        if (currentLevel > 4 || !marker.getMap()) {
          overlay.setMap(null);
        } else {
          overlay.setMap(this.map);
        }
      };

      updateOverlayVisibility();

      // 줌 레벨 변경 시 가시성 업데이트
      if (marker.getMap()) {
        kakao.maps.event.addListener(
          this.map,
          'zoom_changed',
          updateOverlayVisibility,
        );
      }

      kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(store.storeUuid);
      });

      return marker;
    });

    this.clusterer = new kakao.maps.MarkerClusterer({
      map: this.map,
      averageCenter: true,
      minLevel: 6,
    });

    this.clusterer.addMarkers(this.markers);
  }

  clearAllMarkers(): void {
    this.markers.forEach((marker) => {
      marker.setMap(null);
      // 마커에 연결된 오버레이 제거
      if (marker.overlay) {
        marker.overlay.setMap(null);
      }
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

  relayout() {
    if (this.map) {
      this.map.relayout();
    }
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

    // 클러스터러 제거
    if (this.clusterer) {
      this.clusterer.clear();
      this.clusterer = null;
    }
  }

  addMarkerWithName(
    position: MapPosition,
    markerImageSrc: string,
    name: string,
  ): void {
    const markerPosition = new kakao.maps.LatLng(
      position.latitude,
      position.longitude,
    );

    // 마커 이미지 생성
    const imageSize = new kakao.maps.Size(24, 24);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, imageSize);

    // 마커 생성
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
      map: this.map,
    }) as CustomMarker;

    // 커스텀 오버레이 생성
    const content = `<div style="
                      padding: 1px 2px;
                      background-color: white;
                      border-radius: 8px;
                      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                      font-size: 13px;
                      font-weight: 600;
                      color: #333;
                      text-align: center;
                      white-space: nowrap;
                      transform: translateY(-5px);
                      border: 1px solid #eee;
                      max-width: 150px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    ">${name}</div>`;

    const overlay = new kakao.maps.CustomOverlay({
      content: content,
      position: marker.getPosition(),
      yAnchor: 0.1,
      zIndex: -1,
    });

    marker.overlay = overlay;

    const updateOverlayVisibility = () => {
      const currentLevel = this.map.getLevel();
      if (currentLevel > 10 || !marker.getMap()) {
        overlay.setMap(null);
      } else {
        overlay.setMap(this.map);
      }
    };

    updateOverlayVisibility();

    // 줌 레벨 변경 시 가시성 업데이트
    if (marker.getMap()) {
      kakao.maps.event.addListener(
        this.map,
        'zoom_changed',
        updateOverlayVisibility,
      );
    }

    // 마커 배열에 추가
    this.markers.push(marker);
  }

  async convertAddressToCoordinates(address: string): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any[], status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          resolve({
            latitude: Number(result[0].y),
            longitude: Number(result[0].x),
          });
        } else {
          reject(new Error('주소를 좌표로 변환하는데 실패했습니다.'));
        }
      });
    });
  }
}
