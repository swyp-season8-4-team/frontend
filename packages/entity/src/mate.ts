import type { BaseRequestData } from "./appMetadata";

export type MateCategory = '친목도모' | '인생사진' | '카공모임' | '건강맛집' | '빵지순례' | '카공모임 ';

// FIXME: Raw Data 파일 분리
export interface RawMate {
  mateUuid: string;
  storeId?: string;
  userUuid: string;
  title: string;
  content: string;
  nickname: string;
  recruitYn: boolean;
  appliedYn?: boolean;
  mateImage: string[];
  profileImage: string[];
  mateCategory: MateCategory;
  place?: {
    placeName: string;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Mate extends Omit<RawMate,
  'mateUuid' |
  'userUuid' |
  'profileImage' |
  'mateImage' |
  'recruitYn' |
  'appliedYn'
> {
  id: string;
  userId: string;
  mateImage: string;
  profileImage: string;
  recruit: boolean;
  applied?: boolean;
}

export interface RawMateReply {
  mateUuid: string;
  userUuid: string;
  mateReplyId: string;
  content: string;
  nickname: string;
  profileImage: string[];
}

export interface MateReply {
  mateId: string;
  userId: string;
  mateReplyId: string;
  content: string;
  nickname: string;
  profileImage: string;
}

export interface GetMateReplyListRequest {
  id: string;
  from: number;
  to: number;
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

export interface RawMateAcceptRequest {
  creatorUuid: string;
  targetUuid: string;
}

export interface MateAcceptRequest {
  creatorUserId: string;
  userId: string;
  mateId: string;
}

export interface RawMateRejectRequest {
  creatorUuid: string;
  targetUuid: string;
}

export interface MateRejectRequest {
  creatorUserId: string;
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

export interface MateSaveRequest {
  id: string;
  userId: string;
}

export interface MateAllListResponse {
  mates: Mate[];
  isLast: boolean;
}

export interface MateRawAllListResponse {
  mates: RawMate[];
  last: boolean;
}

export interface RawMateReplyRequest {
  userUuid: string;
  content: string;
}

export interface MateReplyRequest {
  id: string;
  userId: string;
  content: string;
}

export interface MateReplyUpdateRequest extends MateReplyRequest {
  replyId: string;
}

export interface MateRepository {
  applyMate(data: BaseRequestData<MateApplyRequest>): Promise<unknown>; // 모임 참여
  leave(data: BaseRequestData<MateLeaveRequest>): Promise<unknown>; // 모임 탈퇴
  acceptMyTeamMember(data: BaseRequestData<MateAcceptRequest>): Promise<unknown>; // 팀 멤버 수락
  rejectMyTeamMember(data: BaseRequestData<MateRejectRequest>): Promise<unknown>; // 팀 멤버 거절
  fireMyTeamMember(data: BaseRequestData<MateFireRequest>): Promise<unknown>; // 팀 멤버 추방
  getWaitList(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 모임 대기 목록 조회
  getMateList(data: BaseRequestData<MateListRequest>): Promise<MateAllListResponse>; // 모임 목록 조회
  getMyTeamMembers(data: BaseRequestData<MateRequest>): Promise<Mate[]>; // 내 팀 멤버들 조회
  getDetails(data: BaseRequestData<MateRequest>): Promise<Mate>; // 모임 상세 페이지
  create(data: BaseRequestData<MateCreateRequest>): Promise<Mate>; // 모임 생성
  delete(data: BaseRequestData<MateRequest>): Promise<void>; // 모임 삭제
  update(data: BaseRequestData<MateUpdateRequest>): Promise<void>; // 모임 수정
  save(data: BaseRequestData<MateSaveRequest>): Promise<unknown>; // 모임 저장
  getSavedMateList(data: BaseRequestData<MateListRequest>): Promise<Mate[]>; // 저장한 모임 목록 조회
  createReply(data: BaseRequestData<MateReplyRequest>): Promise<unknown>; // 모임 댓글 생성
  deleteReply(data: BaseRequestData<Omit<MateReplyUpdateRequest, 'content'>>): Promise<unknown>; // 모임 댓글 삭제
  editReply(data: BaseRequestData<MateReplyUpdateRequest>): Promise<unknown>; // 모임 댓글 수정
  getReply(data: BaseRequestData<MateReplyUpdateRequest>): Promise<MateReply>; // 모임 댓글 조회
  getReplyList(data: BaseRequestData<GetMateReplyListRequest>): Promise<MateReply[]>; // 모임 댓글 목록 조회
  getSavedMateList(data: BaseRequestData<MateListRequest>): Promise<Mate[]>; // 저장한 모임 목록 조회
}
