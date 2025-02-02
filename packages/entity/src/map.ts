export interface Position {
  latitude: number;
  longitude: number;
}

export interface Map {
  setCenter(position: Position): void;
  setLevel(level: number): void;
  getCenter(): Position;
  getLevel(): number;
}

export interface MapRepository {
  getCurrentPosition(): Promise<Position>;
  createMap(container: HTMLDivElement, position: Position): Promise<Map>;
  createMarkersWithClusterer(
    positions: Position[],
    markerImageSrc: string
  ): void;
}
