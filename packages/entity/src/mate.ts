import type { BaseRequestData } from "./appMetadata";

export type MateCategory = '친목도모' | '인생사진' | '카공모임' | '건강맛집' | '빵지순례' | '카공모임 ';

export interface RawMate {
  mateId: string;
  userId: string;
  title: string;
  content: string;
  recruit: boolean;
  mateImage: string[];
  mateCategory: MateCategory;
}

export interface Mate extends Omit<RawMate, 'mateId'> {
  id: string;
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

export interface MateListRequest {
  from: number;
  to: number;
}

export interface MateListResponse {
  mates: Mate[];
  isLast: boolean;
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

export interface MateAllListResponse {
  mates: Mate[];
  isLast: boolean;
}

export interface MateRawAllListResponse {
  mates: RawMate[];
  isLast: boolean;
}

export interface MateRepository {
  apply(data: BaseRequestData<MateApplyRequest>): Promise<unknown>; // 모임 참여
  leave(data: BaseRequestData<MateLeaveRequest>): Promise<unknown>; // 모임 탈퇴
  acceptMyTeamMember(data: BaseRequestData<MateAcceptRequest>): Promise<unknown>; // 팀 멤버 수락
  rejectMyTeamMember(data: BaseRequestData<MateRejectRequest>): Promise<unknown>; // 팀 멤버 거절
  fireMyTeamMember(data: BaseRequestData<MateFireRequest>): Promise<unknown>; // 팀 멤버 추방
  getMateList(data: BaseRequestData<MateListRequest>): Promise<MateAllListResponse>; // 모임 목록 조회
  getMyTeamMembers(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 내 팀 멤버들 조회
  getDetails(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 모임 상세 페이지
  create(data: BaseRequestData<MateCreateRequest>): Promise<Mate>; // 모임 생성
  delete(data: BaseRequestData<MateRequest>): Promise<void>; // 모임 삭제
  update(data: BaseRequestData<MateUpdateRequest>): Promise<void>; // 모임 수정
}
