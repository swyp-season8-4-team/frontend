import type { MapPosition } from '@repo/entity/src/map';
import type { LocationFilter } from '../filters/locationFilter';

export default class GeolocationController {
  private watchId: number | null = null;
  private readonly filters: LocationFilter[];

  constructor(...filters: LocationFilter[]) {
    this.filters = filters;
  }

  private applyFilters(
    position: MapPosition,
    accuracy: number,
  ): Promise<MapPosition> | MapPosition {
    return this.filters.reduce<Promise<MapPosition> | MapPosition>(
      async (pos, filter) => filter.filter(await pos, accuracy),
      position,
    );
  }

  getCurrentPosition(): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            if (process.env.NEXT_PUBLIC_USE_API_MOCKING === 'true') {
              // const latitude = 37.498095;
              // const longitude = 127.028979;
              const latitude = pos.coords.latitude;
              const longitude = pos.coords.longitude;

              const position = this.applyFilters(
                { latitude, longitude },
                pos.coords.accuracy,
              );

              resolve(position);
            } else {
              const latitude = pos.coords.latitude;
              const longitude = pos.coords.longitude;
              const position = this.applyFilters(
                { latitude, longitude },
                pos.coords.accuracy,
              );
              resolve(position);
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
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
          },
        );
      } else {
        reject(new Error('notSupport'));
      }
    });
  }

  startWatching(options?: PositionOptions): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const position = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            };
            resolve(this.applyFilters(position, pos.coords.accuracy));
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
            ...options,
            enableHighAccuracy: true, // 높은 정확도
            timeout: 15000, // 위치를 가져오는 제한 시간
            maximumAge: 0, // 캐시된 위치 정보를 사용하지 않음
          },
        );
      }
    });
  }

  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId); // 위치 추적을 중지
      this.watchId = null;
    }
  }
}
