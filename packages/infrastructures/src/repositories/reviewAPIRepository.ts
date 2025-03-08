import fetch from '@repo/api/src/fetch';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import type {
  Review,
  ReviewListRequestData,
  ReviewListResponse,
  ReviewRepository,
  ReviewUpdateData,
} from '@repo/entity/src/review';
import APIRepository from './apiRepository';
import type { RawReview, RawReviewListResponse } from '@repo/api/src/desserbee-web/review';
import ReviewConverter from '../mappers/reviewConverter';

export default class ReviewAPIRepository
  extends APIRepository
  implements ReviewRepository
{
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

  async getDetail({ data }: BaseRequestData<ReviewUpdateData>): Promise<Review> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/review/${id}`;

    const response = await fetch<void, RawReview>({
      method: 'GET',
      url: url,
    });

    return this.reviewConverter.convertRawToReview(response);
  }

  async edit({ data }: BaseRequestData<ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/review/${id}`;

    const response = await fetch<unknown, unknown>({
      method: 'PATCH',
      url: url,
    });

    return response;
  }

  async delete({ data }: BaseRequestData<ReviewUpdateData>): Promise<unknown> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { id } = data;

    const url = `${this.endpoint}/review/${id}`;

    const response = await fetch<unknown, unknown>({
      method: 'DELETE',
      url: url,
    });

    return response;
  }

  async getAll({ authorization, data }: BaseRequestData<ReviewListRequestData>): Promise<ReviewListResponse> {
    if (!data) {
      throw new Error('data is not set');
    }

    const { from, to, keyword, reviewCategoryId } = data;

    const url = `${this.endpoint}/review`;

    const response = await fetch<void, RawReviewListResponse>({
      ...(authorization && { headers: { Authorization: authorization } }),
      method: 'GET',
      url,
      query: {
        ...(typeof from === 'number' && { from: from.toString() }),
        ...(typeof to === 'number' && { to: to.toString() }),
        ...(!!keyword && { keyword: encodeURIComponent(keyword) }),
        ...(!!reviewCategoryId && { reviewCategoryId }),
      },
    });

    return {
      reviews: response.reviews.map((review) => this.reviewConverter.convertRawToReview(review)),
      isLast: response.last,
    };
  }
}
