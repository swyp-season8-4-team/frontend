import type { MapPosition } from '@repo/entity/src/map';
import type { LocationFilter } from './locationFilter';

export class MovingAverageFilter implements LocationFilter {
  private positions: MapPosition[] = [];

  constructor(private readonly windowSize: number = 5) {}

  filter(position: MapPosition): MapPosition {
    this.positions.push(position);

    if (this.positions.length > this.windowSize) {
      this.positions.shift();
    }

    return {
      latitude:
        this.positions.reduce((sum, pos) => sum + pos.latitude, 0) /
        this.positions.length,
      longitude:
        this.positions.reduce((sum, pos) => sum + pos.longitude, 0) /
        this.positions.length,
    };
  }
}
