import type { ExternalMap, MapPosition } from '@repo/entity/src/map';
import type { StoreMapData } from '@repo/entity/src/store';

interface CustomMarker extends kakao.maps.Marker {
  storeData?: {
    id: number;
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
    this.map.setCenter(
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

  createMarkersWithClusterer(
    storeMapData: StoreMapData[],
    markerImageSrc: string,
    handleMarkerClick: (storeId: number) => void,
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
        id: store.id,
        name: store.name,
        address: store.address,
      };

      kakao.maps.event.addListener(marker, 'click', () => {
        handleMarkerClick(store.id);
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

  getMarkerById(storeId: number): CustomMarker | undefined {
    return this.markers.find((marker) => marker.storeData?.id === storeId);
  }

  removeMarkerById(storeId: number): void {
    const markerIndex = this.markers.findIndex(
      (marker) => marker.storeData?.id === storeId,
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
}
