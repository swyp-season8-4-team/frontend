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

  private formatCoordinates(latitude: number, longitude: number) {
    // latitude: decimal(10,8) -> 총 10자리, 소수점 8자리
    // longitude: decimal(11,8) -> 총 11자리, 소수점 8자리
    return {
      latitude: Number(latitude.toFixed(8)),
      longitude: Number(longitude.toFixed(8)),
    };
  }

  getCurrentPosition(): Promise<MapPosition> {
    console.log('[GeolocationController] 위치 정보 요청 시작');
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        console.error(
          '[GeolocationController] 브라우저가 위치 정보를 지원하지 않음',
        );
        reject(new Error('notSupport'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log('[GeolocationController] 위치 정보 획득 성공', {
            accuracy: pos.coords.accuracy,
            timestamp: new Date(pos.timestamp).toISOString(),
          });
          //TODO: 가짜 위치
          // const latitude = 37.55498563;
          // const longitude = 126.90483844;
          const { latitude, longitude } = this.formatCoordinates(
            pos.coords.latitude,
            pos.coords.longitude,
          );

          const position = this.applyFilters(
            { latitude, longitude },
            pos.coords.accuracy,
          );
          console.log('[GeolocationController] 필터링된 위치 정보', position);
          resolve(position);
        },
        (err) => {
          console.error('[GeolocationController] 위치 정보 획득 실패', {
            code: err.code,
            message: err.message,
          });

          if (err.code === 3) {
            reject(new Error('delayed'));
          } else if (err.code === 1) {
            reject(new Error('blocked'));
          } else if (err.code === 2) {
            reject(new Error('unavailable'));
          } else {
            reject(new Error('unknown'));
          }
        },
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
    options?: PositionOptions,
  ): Promise<MapPosition> {
    return new Promise<MapPosition>((resolve, reject) => {
      if (navigator.geolocation) {
        this.watchId = navigator.geolocation.watchPosition(
          (pos) => {
            const { latitude, longitude } = this.formatCoordinates(
              pos.coords.latitude,
              pos.coords.longitude,
            );

            const position = this.applyFilters(
              { latitude, longitude },
              pos.coords.accuracy,
            );

            // // //TODO: 가짜 위치
            // const latitude = 37.55498563;
            // const longitude = 126.90483844;

            // const position = {
            //   latitude,
            //   longitude,
            // };

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
