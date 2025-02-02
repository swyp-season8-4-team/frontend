import type { Map, Position } from "@repo/entity/src/map";

export class KakaoMapAdapter implements Map {
  constructor(private readonly map: kakao.maps.Map) {}

  setCenter(position: Position): void {
    this.map.setCenter(
      new kakao.maps.LatLng(position.latitude, position.longitude)
    );
  }

  setLevel(level: number): void {
    this.map.setLevel(level);
  }

  getCenter(): Position {
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
}
