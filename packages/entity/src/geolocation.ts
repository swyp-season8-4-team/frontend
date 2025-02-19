import type { MapPosition } from './map';

export interface GeolocationController {
  getCurrentPosition(): Promise<MapPosition>;
  startWatching(
    onSuccess: (position: MapPosition) => void,
    options?: PositionOptions,
  ): Promise<MapPosition>;
  stopWatching(): Promise<void>;
}
