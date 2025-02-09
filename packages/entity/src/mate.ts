import type { BaseRequestData } from "./appMetadata";

export interface RawMate {
  mateId: string;
  userId: string;
  title: string;
  content: string;
  recruitYn: boolean;
  createdAt?: string;
  updatedAt?: string;
  mateCategoryId: string;
}

export interface Mate {
  id: string;
  userId: string;
  title: string;
  content: string;
  recruit: boolean; // 모집 여부
  createdAt?: string;
  updatedAt?: string;
  mateCategoryId: string;
}

export interface MateCreateRequest {
  title: string;
  content: string;
  recruit: boolean;
  mateCategoryId: string;
}

export interface MateRequest {
  id: string;
}

export interface RawMateUpdateRequest {
  title: string;
  content: string;
  recruitYn: boolean;
  mateCategoryId: string;
}

export interface MateUpdateRequest extends MateRequest {
  title: string;
  content: string;
  recruit: boolean;
  mateCategoryId: string;
}

export interface MateRepository {
  getDetails(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 모임 상세 페이지
  create(data: BaseRequestData<MateCreateRequest>): Promise<Mate>; // 모임 생성
  delete(data: BaseRequestData<MateRequest>): Promise<void>; // 모임 삭제
  update(data: BaseRequestData<MateUpdateRequest>): Promise<void>; // 모임 수정
}
