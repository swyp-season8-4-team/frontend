import type { MapPosition } from '@repo/entity/src/map';
import type { LocationFilter } from '../filters/locationFilter';

export default class GeolocationController {
  private watchId: number | null = null;
  private readonly filters: LocationFilter[];

  constructor(...filters: LocationFilter[]) {
    this.filters = filters;
  }

  private applyFilters(position: MapPosition, accuracy: number): MapPosition {
    return this.filters.reduce<MapPosition>(
      (pos, filter) => filter.filter(pos, accuracy),
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

  startWatching(
    onSuccess: (position: MapPosition) => void,
    options?: PositionOptions,
  ): Promise<MapPosition> {
    return new Promise<MapPosition>((resolve, reject) => {
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const latitude = pos.coords.latitude;
            const longitude = pos.coords.longitude;
            const position = this.applyFilters(
              { latitude, longitude },
              pos.coords.accuracy,
            );

            onSuccess(position);
            resolve(position);
          },
          (err) => {
            if (err.code === 3) {
              new Error('watching 지연');
            }
            if (err.code === 1) {
              new Error('watching 중단');
            }
          },
          {
            ...options,
            enableHighAccuracy: true,
            timeout: 1500,
            maximumAge: 0,
          },
        );
      }
    });
  }

  stopWatching(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId); // 위치 추적을 중지
        this.watchId = null;
        resolve();
      }
    });
  }
}
