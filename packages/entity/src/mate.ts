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

export interface MateApplyRequest {
  mateId: string;
  userId: string;
}

export interface MateLeaveRequest {
  userUuid: string;
}

export interface MateAcceptRequest {
  userId: string;
  mateId: string;
}

export interface MateRejectRequest {
  userId: string;
  mateId: string;
}

export interface MateFireRequest {
  creatorId: string;
  userId: string;
  mateId: string;
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
  apply(data: BaseRequestData<MateApplyRequest>): Promise<unknown>; // 모임 참여
  leave(data: BaseRequestData<MateLeaveRequest>): Promise<unknown>; // 모임 탈퇴
  getMyTeamMembers(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 내 팀 멤버들 조회
  acceptMyTeamMember(data: BaseRequestData<MateAcceptRequest>): Promise<unknown>; // 팀 멤버 수락
  rejectMyTeamMember(data: BaseRequestData<MateRejectRequest>): Promise<unknown>; // 팀 멤버 거절
  fireMyTeamMember(data: BaseRequestData<MateFireRequest>): Promise<unknown>; // 팀 멤버 추방
  getDetails(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 모임 상세 페이지
  create(data: BaseRequestData<MateCreateRequest>): Promise<Mate>; // 모임 생성
  delete(data: BaseRequestData<MateRequest>): Promise<void>; // 모임 삭제
  update(data: BaseRequestData<MateUpdateRequest>): Promise<void>; // 모임 수정
}
