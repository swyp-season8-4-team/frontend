import ReviewMockAPIRepository from '@/infrastructures/repositories/reviewMockAPIRepository';
import ReviewService from '@repo/usecase/src/reviewService';
import { http, HttpResponse } from 'msw';

const API_ENDPOINT = 'http://localhost:3000/api';

const reviewService = new ReviewService({
  reviewRepository: new ReviewMockAPIRepository()
})

export const reviewHandlers = [
  // 내 리뷰 조회
  http.get(`${API_ENDPOINT}/reviews/me`, () => {
    return HttpResponse.json(reviewService.getMine({}));
  }),

  // 리뷰 수정
  // http.patch(`${API_ENDPOINT}/reviews/8b07fc58-ae7c-4e4c-9a56-1c4676f84864`, async ({ params }) => {
  //   const { id } = params;
  //   if (typeof id !== 'string') {
  //     return HttpResponse.json({ error: 'ID is required' }, { status: 400 });
  //   }

  //   return HttpResponse.json(reviewService.edit({ id, ...data }));
  // }),

  // 리뷰 삭제
  http.delete(`${API_ENDPOINT}/reviews/8b07fc58-ae7c-4e4c-9a56-1c4676f84864`, ({ params }) => {
    // 실제 구현에서는 DB에서 삭제하는 로직
    return HttpResponse.json({ success: true, message: '리뷰가 삭제되었습니다.' });
  }),

  // 모든 리뷰 조회
  http.get(`${API_ENDPOINT}/reviews`, () => {
    return HttpResponse.json(reviewService.getAll({}));
  }),
];
