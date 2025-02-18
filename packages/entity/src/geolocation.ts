import type { MapPosition } from './map';

export interface GeolocationController {
  getCurrentPosition(): Promise<MapPosition>;
  startWatching(options?: PositionOptions): Promise<MapPosition>;
  stopWatching(): void;
}
