import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  CancelSaveRequest,
  GetReviewReplyListRequest,
  GetReviewReplyListResponse,
  RawGetReviewReplyListResponse,
  RawReviewReply,
  RawReviewReplyRequest,
  RawReviewWriteRequest,
  Review,
  ReviewListRequestData,
  ReviewListResponse,
  ReviewReply,
  ReviewReplyRequest,
  ReviewReplyUpdateRequest,
  ReviewRepository,
  ReviewUpdateData,
  ReviewWriteData,
  SavedReviewListRequest,
  SavedReviewListResponse,
  SaveReviewRequest,
  SaveReviewResponse,
} from '@repo/entity/src/review';
import APIRepository from './apiRepository';
import type {
  RawReview,
  RawReviewListResponse,
} from '@repo/api/src/desserbee-web/review';
import ReviewConverter from '../mappers/reviewConverter';
import PlaceConverter from '../mappers/placeConverter';
import type { CommunityDessertReviewCategory } from '@repo/entity/src/community';

export default class ReviewAPIRepository
  extends APIRepository
  implements ReviewRepository
{
  private readonly placeConverter = new PlaceConverter();
  private readonly reviewConverter = new ReviewConverter();

  async getMine(data: BaseRequestData<unknown>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const url = `${this.endpoint}/review/me`;

    const response = await fetch<unknown, unknown>({
      method: 'GET',
      url: url,
    });

    return response;
  }

  async getDetail({
    authorization,
    data,
  }: BaseRequestData<ReviewUpdateData>): Promise<Review> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/review/${id}`;

    const response = await fetch<void, RawReview>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url: url,
    });

    return this.reviewConverter.convertRawToReview(response);
  }

  async write({
    data,
    authorization,
  }: BaseRequestData<ReviewWriteData>): Promise<Review> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { userId, title, contents, category, place, imageFiles } = data;
    const formData = new FormData();

    const requestData = {
      userUuid: userId,
      title,
      contents,
      reviewCategoryId: this.reviewConverter.convertCategoryToRaw(category),
      place: this.placeConverter.convertPlaceToRaw(place),
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
    );

    if (!!imageFiles) {
      imageFiles.forEach((imageFile) => {
        formData.append('reviewImages', imageFile);
      });
    }

    const response = await fetch<RawReviewWriteRequest, RawReview>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'POST',
      url: `${this.endpoint}/review`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      formData,
    });

    return this.reviewConverter.convertRawToReview(response);
  }

  async edit({
    data,
    authorization,
  }: BaseRequestData<ReviewWriteData & ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, ...rest } = data;
    const { userId, title, contents, category, place, imageFiles } = rest;
    const formData = new FormData();

    const requestData = {
      userUuid: userId,
      title,
      contents,
      reviewCategoryId: this.reviewConverter.convertCategoryToRaw(category),
      place: this.placeConverter.convertPlaceToRaw(place),
    };

    formData.append(
      'request',
      new Blob([JSON.stringify(requestData)], { type: 'application/json' }),
    );

    if (!!imageFiles) {
      imageFiles.forEach((imageFile) => {
        formData.append('reviewImages', imageFile);
      });
    }

    const response = await fetch<void, unknown>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'PATCH',
      url: `${this.endpoint}/review/${id}`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      formData,
    });

    return response;
  }

  async delete({
    data,
    authorization,
  }: BaseRequestData<ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;
    const response = await fetch<unknown, unknown>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'DELETE',
      url: `${this.endpoint}/review/${id}`,
    });

    return response;
  }

  async getAll({
    authorization,
    data,
  }: BaseRequestData<ReviewListRequestData>): Promise<ReviewListResponse> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { from, to, keyword, categoryId } = data;

    const url = `${this.endpoint}/review`;

    const response = await fetch<void, RawReviewListResponse>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url,
      query: {
        ...(typeof from === 'number' && { from: from.toString() }),
        ...(typeof to === 'number' && { to: to.toString() }),
        ...(!!keyword && { keyword: encodeURIComponent(keyword) }),
        ...(!!categoryId && {
          reviewCategoryId: this.reviewConverter
            .convertCategoryToRaw(categoryId as CommunityDessertReviewCategory)
            .toString(),
        }),
      },
    });

    return {
      reviews: response.reviews.map((review) =>
        this.reviewConverter.convertRawToReview(review),
      ),
      isLast: response.last,
    };
  }

  async createReply({
    data,
    authorization,
  }: BaseRequestData<ReviewReplyRequest>): Promise<ReviewReply> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, userId, content } = data;
    const response = await fetch<RawReviewReplyRequest, RawReviewReply>({
      ...(authorization && { headers: { Authorization: authorization } }),
      data: {
        userUuid: userId,
        content,
      },
      method: 'POST',
      url: `${this.endpoint}/review/${id}/reply`,
    });

    return this.reviewConverter.convertRawToReviewReply(response);
  }

  async getReplyList({
    data,
    authorization,
  }: BaseRequestData<GetReviewReplyListRequest>): Promise<GetReviewReplyListResponse> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, from, to } = data;

    const url = `${this.endpoint}/review/${id}/reply`;

    const response = await fetch<void, RawGetReviewReplyListResponse>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url,
      query: {
        ...(typeof from === 'number' && { from: from.toString() }),
        ...(typeof to === 'number' && { to: to.toString() }),
      },
    });

    return {
      replyList: response.reviews.map((reply) =>
        this.reviewConverter.convertRawToReviewReply(reply),
      ),
      isLast: response.last,
    };
  }

  async getReply({
    data,
    authorization,
  }: BaseRequestData<ReviewReplyUpdateRequest>): Promise<ReviewReply> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, replyId } = data;

    const url = `${this.endpoint}/review/${id}/reply/${replyId}`;

    const response = await fetch<void, RawReviewReply>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url: url,
    });

    return this.reviewConverter.convertRawToReviewReply(response);
  }

  async deleteReply({
    data,
    authorization,
  }: BaseRequestData<
    Omit<ReviewReplyUpdateRequest, 'content'>
  >): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, userId, replyId } = data;

    const url = `${this.endpoint}/review/${id}/reply/${replyId}`;

    const response = await fetch<{ userUuid: string }, unknown>({
      ...(authorization && { headers: { Authorization: authorization } }),
      data: {
        userUuid: userId,
      },
      method: 'DELETE',
      url: url,
    });

    return response;
  }

  async editReply({
    data,
    authorization,
  }: BaseRequestData<ReviewReplyUpdateRequest>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id, userId, replyId, content } = data;

    const url = `${this.endpoint}/review/${id}/reply/${replyId}`;

    const response = await fetch<RawReviewReplyRequest, unknown>({
      ...(authorization && { headers: { Authorization: authorization } }),
      data: {
        userUuid: userId,
        content,
      },
      method: 'PATCH',
      url: url,
    });

    return response;
  }

  async save({
    data,
    authorization,
  }: BaseRequestData<SaveReviewRequest>): Promise<SaveReviewResponse> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { reviewUuid } = data;

    const url = `${this.endpoint}/review/saved/${reviewUuid}`;

    const response = await fetch<SaveReviewRequest, SaveReviewResponse>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'POST',
      url: url,
    });

    return response;
  }

  async cancelSave({
    data,
    authorization,
  }: BaseRequestData<CancelSaveRequest>): Promise<void> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { reviewUuid } = data;

    const url = `${this.endpoint}/review/saved/${reviewUuid}`;

    const response = await fetch<CancelSaveRequest, void>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'DELETE',
      url: url,
    });

    return response;
  }

  async getSaved({
    data,
    authorization,
  }: BaseRequestData<SavedReviewListRequest>): Promise<SavedReviewListResponse> {
    if (!data) {
      throw new Error('data is not set');
    }
    const { from, to } = data;

    const url = `${this.endpoint}/review/saved`;

    const response = await fetch<
      SavedReviewListRequest,
      SavedReviewListResponse
    >({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url: url,
      query: {
        ...(typeof from === 'number' && { from: from.toString() }),
        ...(typeof to === 'number' && { to: to.toString() }),
      },
    });

    return response;
  }
}
