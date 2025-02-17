import type { MapPosition } from '@repo/entity/src/map';
import type { LocationFilter } from '../filters/locationFilter';

export default class GeolocationController {
  private watchId: number | null = null;
  private readonly filters: LocationFilter[];

  constructor(...filters: LocationFilter[]) {
    this.filters = filters;
  }

  getInitialPosition(): Promise<MapPosition> {
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

  private applyFilters(position: MapPosition, accuracy: number): MapPosition {
    return this.filters.reduce(
      (pos, filter) => filter.filter(pos, accuracy),
      position,
    );
  }

  getCurrentPosition(): Promise<MapPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('notSupport'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          resolve(this.applyFilters(position, pos.coords.accuracy));
        },
        (err) => reject(new Error(err.message)),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        },
      );
    });
  }

  startWatching(
    onSuccess: (position: MapPosition) => void,
    onError: (error: GeolocationPositionError) => void,
    options?: PositionOptions,
  ): void {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const position = {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          };
          onSuccess(this.applyFilters(position, pos.coords.accuracy));
        },
        onError,
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
          ...options,
        },
      );
    }
  }

  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
      this.watchId = null;
    }
  }
}
