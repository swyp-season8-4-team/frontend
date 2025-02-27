import type {
  CreateOnelineReviewRequestFormData,
  CreateOnelineReviewResponse,
  OnelineReviewRequests,
  ReviewRepository,
  StoreOnelineReivewData,
  StoreOnelineReivewRequest,
} from '@repo/entity/src/review';
import APIRepository from './apiRepository';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import fetch from '@repo/api/src/fetch';

export default class ReviewAPIRepository
  extends APIRepository
  implements ReviewRepository
{
  async getStoreReviews({
    data,
  }: BaseRequestData<StoreOnelineReivewRequest>): Promise<
    StoreOnelineReivewData[]
  > {
    const { storeUuid } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews`;

    const response = await fetch<void, StoreOnelineReivewData[]>({
      method: 'POST',
      url: url,
    });

    return response;
  }

  async createOnelineReview({
    data,
  }: BaseRequestData<CreateOnelineReviewRequestFormData>): Promise<CreateOnelineReviewResponse> {
    if (!data) {
      throw Error('data required');
    }
    const { storeUuid, request, images } = data || {};

    const url = `${this.endpoint}/stores/${storeUuid}/reviews`;

    const response = await fetch<
      { request: OnelineReviewRequests; images?: File },
      CreateOnelineReviewResponse
    >({
      data: { request, images },
      method: 'POST',
      url: url,
    });

    return response;
  }
}
