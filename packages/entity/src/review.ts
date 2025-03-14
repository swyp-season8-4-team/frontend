import { type RawPlace } from './../../api/src/desserbee-web/place'; // FIXME:
// import type { RawPlace } from '@repo/api/src/desserbee-web/place';
import type { BaseRequestData } from './appMetadata';
import type {
  CommunityCategory,
  CommunityDessertReviewCategory,
} from './community';
import type { Place } from './place';
import type { Gender } from './user';

export interface ReviewImage {
  id: string;
  url: string;
}

export interface ReviewContent {
  type: 'image' | 'text';
  value?: string;
  imageId?: number;
  imageIndex?: number;
  imageUrl?: string;
}

export interface Review {
  id: string;
  nickname: string;
  storeId: number;
  userId: string;
  title: string;
  contents: ReviewContent[];
  profileImage: string;
  createdAt: string;
  updatedAt: string;
  saved: boolean;
  place: Place;
  gender: Gender;
  viewCount: number;
  category: CommunityDessertReviewCategory;
}

export interface RawReviewReply {
  reviewUuid: string;
  userUuid: string;
  replyUuid: string;
  content: string;
  nickname: string;
  profileImage: string;
  gender: Gender;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewReply
  extends Omit<RawReviewReply, 'reviewUuid' | 'userUuid' | 'replyUuid'> {
  id: string;
  userId: string;
  replyId: string;
}

export interface ReviewTag {
  id: number;
  name: string;
}

export interface ReviewUpdateData {
  id: string;
}

export interface ReviewListRequestData {
  from?: number;
  to?: number;
  keyword?: string;
  categoryId?: CommunityCategory;
}

export interface ReviewListResponse {
  reviews: Review[];
  isLast: boolean;
}

export interface RawReviewWriteRequest {
  userUuid: string;
  title: string;
  contents: ReviewContent[];
  reviewCategoryId: number;
  place: RawPlace;
}

export interface ReviewWriteData {
  userId: string;
  title: string;
  contents: ReviewContent[];
  category: CommunityDessertReviewCategory;
  place: Place;
  imageFiles?: File[];
}

export interface RawReviewReplyRequest {
  userUuid: string;
  content: string;
}

export interface ReviewReplyRequest {
  id: string;
  userId: string;
  content: string;
}

export interface ReviewReplyUpdateRequest extends ReviewReplyRequest {
  replyId: string;
}

export interface RawGetReviewReplyListResponse {
  reviews: RawReviewReply[];
  last: boolean;
}

export interface GetReviewReplyListRequest {
  id: string;
  from?: number;
  to?: number;
}

export interface GetReviewReplyListResponse {
  replyList: ReviewReply[];
  isLast: boolean;
}

export interface SaveReviewRequest {
  reviewUuid: string;
}

export interface CancelSaveRequest {
  reviewUuid: string;
}

export interface SaveReviewResponse {}
// {
//   "additionalProp1": "string",
//   "additionalProp2": "string",
//   "additionalProp3": "string"
// }

export interface SavedReviewListRequest {
  from?: number;
  to?: number;
}

export interface SavedReviewContents {
  id: number;
  type: string;
  value: string;
  imageId: number;
  imageUuid: string;
  imageUrl: string;
}

export interface SavedReview {
  reviewUuid: string;
  storeId: number;
  userUuid: string;
  nickname: string;
  profileImage: string;
  contents: SavedReviewContents[];
  title: string;
  place: {
    placeName: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  reviewCategory: string;
  createdAt: string;
  updatedAt: string;
  saved: boolean;
  gender: string;
  views: number;
}

export interface SavedReviewListResponse {
  reviews: SavedReview[];
  last: boolean;
}

export interface ReviewRepository {
  // 내가 쓴 리뷰 조회
  getMine(data: BaseRequestData<unknown>): Promise<unknown>;

  // 상세페이지 조회
  getDetail(data: BaseRequestData<ReviewUpdateData>): Promise<Review>;

  // 리뷰 작성
  write(data: BaseRequestData<ReviewWriteData>): Promise<Review>;

  // 내가 쓴 리뷰 수정
  edit(
    data: BaseRequestData<ReviewWriteData & ReviewUpdateData>,
  ): Promise<unknown>;

  // 내가 쓴 리뷰 삭제
  delete(data: BaseRequestData<ReviewUpdateData>): Promise<unknown>;

  // 모든 리뷰 조회
  getAll(
    data: BaseRequestData<ReviewListRequestData>,
  ): Promise<ReviewListResponse>;

  createReply(data: BaseRequestData<ReviewReplyRequest>): Promise<ReviewReply>; // 리뷰 댓글 생성
  deleteReply(
    data: BaseRequestData<Omit<ReviewReplyUpdateRequest, 'content'>>,
  ): Promise<unknown>; // 리뷰 댓글 삭제
  editReply(data: BaseRequestData<ReviewReplyUpdateRequest>): Promise<unknown>; // 리뷰 댓글 수정
  getReply(
    data: BaseRequestData<ReviewReplyUpdateRequest>,
  ): Promise<ReviewReply>; // 리뷰 댓글 조회
  getReplyList(
    data: BaseRequestData<GetReviewReplyListRequest>,
  ): Promise<GetReviewReplyListResponse>; // 리뷰 댓글 목록 조회

  save(data: BaseRequestData<SaveReviewRequest>): Promise<SaveReviewResponse>;

  cancelSave(data: BaseRequestData<CancelSaveRequest>): Promise<void>;

  getSaved(
    data: BaseRequestData<SavedReviewListRequest>,
  ): Promise<SavedReviewListResponse>;
}
