import type { BaseRequestData } from './appMetadata';

export interface ReviewTag {
  id: number;
  name: string;
}

export interface ReviewUpdateData {
  id: string;
}

export interface ReviewRepository {
  // 내가 쓴 리뷰 조회
  getMine(data: BaseRequestData<unknown>): Promise<unknown>;

  // 내가 쓴 리뷰 수정
  edit(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 내가 쓴 리뷰 삭제
  delete(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 모든 리뷰 조회
  getAll(data: BaseRequestData<unknown>): Promise<unknown>;
}
