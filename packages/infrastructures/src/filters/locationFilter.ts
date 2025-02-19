import type { MapPosition } from '@repo/entity/src/map';

export interface LocationFilter {
  filter(position: MapPosition, accuracy: number): MapPosition;
}

export class KalmanLocationFilter implements LocationFilter {
  private lastPosition: MapPosition | null = null;
  private lastAccuracy: number | null = null;

  filter(newPosition: MapPosition, accuracy: number): MapPosition {
    if (!this.lastPosition || !this.lastAccuracy) {
      this.lastPosition = newPosition;
      this.lastAccuracy = accuracy;
      return newPosition;
    }

    // 칼만 게인 계산 (0~1 사이 값)
    const k = this.lastAccuracy / (this.lastAccuracy + accuracy);

    // 위치 보정
    const filteredPosition = {
      latitude:
        this.lastPosition.latitude +
        k * (newPosition.latitude - this.lastPosition.latitude),
      longitude:
        this.lastPosition.longitude +
        k * (newPosition.longitude - this.lastPosition.longitude),
    };

    // 새로운 정확도 계산
    this.lastAccuracy = (1 - k) * this.lastAccuracy;
    this.lastPosition = filteredPosition;

    return filteredPosition;
  }
}
