import type { MapController, MapPosition } from "@repo/entity/src/map";

interface MapErrorMessage {
  errorMessage: string;
}

export default class MapService {
  private readonly mapController: MapController | null;

  constructor({ mapController }: { mapController?: MapController }) {
    this.mapController = mapController ?? null;
  }

  async getCurrentPosition(): Promise<MapPosition | MapErrorMessage> {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    try {
      const permissionStatus = await navigator.permissions.query({
        name: "geolocation",
      });

      switch (permissionStatus.state) {
        case "denied":
          return {
            errorMessage: "위치 권한 허용 후 서비스 이용이 가능합니다.",
          }; // TODO: 위치 권한 설명 모달 트리거
        case "prompt":
          return {
            errorMessage: "위치 권한 허용 후 서비스 이용이 가능합니다.",
          }; // TODO: 위치 권한 설명 모달 트리거
        case "granted":
          break;
      }

      const position = await this.mapController.getCurrentPosition();
      return position;
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "delayed":
            return {
              errorMessage: "위치 정보를 가져오는데 시간이 너무 오래 걸립니다.",
            };
          case "blocked":
            return {
              errorMessage: "위치 정보 접근 권한이 없습니다.",
            };
          case "notSupport":
            return {
              errorMessage: "이 브라우저는 위치 정보 기능을 지원하지 않습니다.",
            };
          default:
            return { errorMessage: error.message };
        }
      }
      return { errorMessage: String(error) };
    }
  }

  async initializeMap(container: HTMLDivElement, currentPosition: MapPosition) {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    const map = await this.mapController.createMap(container, currentPosition);
    return map;
  }

  async addMarkersWithClustering(
    positions: MapPosition[],
    markerImageSrc: string
  ) {
    if (!this.mapController) {
      throw new Error("mapController is not set");
    }

    this.mapController.createMarkersWithClusterer(positions, markerImageSrc);
  }
}
