import type {
  CancelSaveRequest,
  Review,
  ReviewListResponse,
  ReviewRepository,
  ReviewUpdateData,
  ReviewWriteData,
  SavedReviewListRequest,
  SavedReviewListResponse,
  SaveReviewRequest,
  SaveReviewResponse,
} from '@repo/entity/src/review';
import APIRepository from '@repo/infrastructures/src/repositories/apiRepository';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';

export default class ReviewMockAPIRepository
  extends APIRepository
  implements ReviewRepository
{
  write(data: BaseRequestData<ReviewWriteData>): Promise<Review> {
    throw new Error('Method not implemented.');
  }

  private readonly sampleReviews: Review[] = [
    // {
    //   id: '8b07fc58-ae7c-4e4c-9a56-1c4676f84864',
    //   nickname: '디저트러버',
    //   storeId: 1001,
    //   userId: 'user-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    //   title: '맛있는 디저트 카페',
    //   content: '맛있어요! 다음에 또 방문하고 싶습니다.',
    //   reviewImages: [
    //     {
    //       url: 'https://example.com/images/review1_1.jpg',
    //       id: 'review1_1'
    //     },
    //     {
    //       url: 'https://example.com/images/review1_2.jpg',
    //       id: 'review1_2'
    //     }
    //   ],
    //   profileImage: ['https://example.com/images/profile1.jpg'],
    //   createdAt: '2023-10-15T09:30:00Z',
    //   updatedAt: '2023-10-15T09:30:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 강남점',
    //     address: '서울시 강남구 테헤란로 123'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    //   nickname: '케이크킹',
    //   storeId: 1002,
    //   userId: 'user-b2c3d4e5-f6a7-8901-bcde-f12345678901',
    //   title: '서비스가 좋은 카페',
    //   content: '서비스가 좋았습니다. 디저트도 맛있어요.',
    //   reviewImages: [
    //     {
    //       url: 'https://example.com/images/review2_1.jpg',
    //       id: 'review2_1'
    //     }
    //   ],
    //   profileImage: ['https://example.com/images/profile2.jpg'],
    //   createdAt: '2023-10-10T14:20:00Z',
    //   updatedAt: '2023-10-10T14:20:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 홍대점',
    //     address: '서울시 마포구 홍대로 456'
    //   }
    // },
    // {
    //   id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '디저트러버',
    //   storeId: 1003,
    //   userId: 'user-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    //   title: '분위기 좋은 카페',
    //   content: '분위기는 좋았지만 가격이 조금 비싼 편이에요.',
    //   reviewImages: [
    //     {
    //       url: 'https://example.com/images/review3_1.jpg',
    //       id: 'review3_1'
    //     },
    //     {
    //       url: 'https://example.com/images/review3_2.jpg',
    //       id: 'review3_2'
    //     },
    //     {
    //       url: 'https://example.com/images/review3_3.jpg',
    //       id: 'review3_3'
    //     }
    //   ],
    //   profileImage: ['https://example.com/images/profile1.jpg'],
    //   createdAt: '2023-10-05T18:45:00Z',
    //   updatedAt: '2023-10-05T18:45:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 이태원점',
    //     address: '서울시 용산구 이태원로 789'
    //   }
    // },
    // {
    //   id: '550e8400-e29b-41d4-a716-446655440000',
    //   nickname: '달콤한하루',
    //   storeId: 1004,
    //   userId: 'user-c3d4e5f6-a7b8-9012-cdef-123456789012',
    //   title: '부드러운 케이크',
    //   content: '케이크가 정말 부드럽고 달콤해요!',
    //   reviewImages: [
    //     'https://example.com/images/review4_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile3.jpg'],
    //   createdAt: '2023-09-28T12:15:00Z',
    //   updatedAt: '2023-09-28T12:15:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 명동점',
    //     address: '서울시 중구 명동길 101'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d480',
    //   nickname: '카페홀릭',
    //   storeId: 1005,
    //   userId: 'user-d4e5f6a7-b8c9-0123-def4-56789012345a',
    //   title: '친절한 직원들',
    //   content: '직원분들이 친절하고 매장도 깨끗해요.',
    //   reviewImages: [
    //     'https://example.com/images/review5_1.jpg',
    //     'https://example.com/images/review5_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile4.jpg'],
    //   createdAt: '2023-09-20T16:30:00Z',
    //   updatedAt: '2023-09-20T16:30:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 강북점',
    //     address: '서울시 강북구 도봉로 202'
    //   }
    // },
    // {
    //   id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '커피마니아',
    //   storeId: 1006,
    //   userId: 'user-e5f6a7b8-c9d0-1234-ef56-789012345678',
    //   title: '커피와 디저트의 조합',
    //   content: '커피와 디저트의 조합이 환상적이에요.',
    //   reviewImages: [
    //     'https://example.com/images/review6_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile5.jpg'],
    //   createdAt: '2023-09-15T10:45:00Z',
    //   updatedAt: '2023-09-15T10:45:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 송파점',
    //     address: '서울시 송파구 올림픽로 303'
    //   }
    // },
    // {
    //   id: '550e8401-e29b-41d4-a716-446655440000',
    //   nickname: '맛집탐험가',
    //   storeId: 1007,
    //   userId: 'user-f6a7b8c9-d0e1-2345-f678-90123456789a',
    //   title: '가격 대비 양',
    //   content: '가격 대비 양이 조금 적은 것 같아요.',
    //   reviewImages: [],
    //   profileImage: ['https://example.com/images/profile6.jpg'],
    //   createdAt: '2023-09-10T14:20:00Z',
    //   updatedAt: '2023-09-10T14:20:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 신촌점',
    //     address: '서울시 서대문구 신촌로 404'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d481',
    //   nickname: '특별한날',
    //   storeId: 1008,
    //   userId: 'user-a7b8c9d0-e1f2-3456-a789-0123456789bc',
    //   title: '특별한 날에 방문하기 좋은 곳',
    //   content: '특별한 날에 방문하기 좋은 곳이에요.',
    //   reviewImages: [
    //     'https://example.com/images/review8_1.jpg',
    //     'https://example.com/images/review8_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile7.jpg'],
    //   createdAt: '2023-09-05T19:10:00Z',
    //   updatedAt: '2023-09-05T19:10:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 건대점',
    //     address: '서울시 광진구 능동로 505'
    //   }
    // },
    // {
    //   id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '인스타그래머',
    //   storeId: 1009,
    //   userId: 'user-b8c9d0e1-f2a3-4567-b890-123456789cde',
    //   title: '인테리어가 예쁜 카페',
    //   content: '인테리어가 예쁘고 사진 찍기 좋아요.',
    //   reviewImages: [
    //     'https://example.com/images/review9_1.jpg',
    //     'https://example.com/images/review9_2.jpg',
    //     'https://example.com/images/review9_3.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile8.jpg'],
    //   createdAt: '2023-08-28T11:30:00Z',
    //   updatedAt: '2023-08-28T11:30:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 잠실점',
    //     address: '서울시 송파구 올림픽로 606'
    //   }
    // },
    // {
    //   id: '550e8402-e29b-41d4-a716-446655440000',
    //   nickname: '디저트킹',
    //   storeId: 1010,
    //   userId: 'user-c9d0e1f2-a3b4-5678-c901-23456789def0',
    //   title: '다양한 디저트',
    //   content: '디저트 종류가 다양해서 좋아요.',
    //   reviewImages: [
    //     'https://example.com/images/review10_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile9.jpg'],
    //   createdAt: '2023-08-20T15:45:00Z',
    //   updatedAt: '2023-08-20T15:45:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 대학로점',
    //     address: '서울시 종로구 대학로 707'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d482',
    //   nickname: '주차고민',
    //   storeId: 1011,
    //   userId: 'user-d0e1f2a3-b4c5-6789-d012-3456789efab',
    //   title: '주차 불편',
    //   content: '주차가 조금 불편해요.',
    //   reviewImages: [],
    //   profileImage: ['https://example.com/images/profile10.jpg'],
    //   createdAt: '2023-08-15T13:20:00Z',
    //   updatedAt: '2023-08-15T13:20:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 압구정점',
    //     address: '서울시 강남구 압구정로 808'
    //   }
    // },
    // {
    //   id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '맛집탐방',
    //   storeId: 1012,
    //   userId: 'user-e1f2a3b4-c5d6-789a-e123-456789fabcd',
    //   title: '시그니처 메뉴 추천',
    //   content: '시그니처 메뉴가 정말 맛있어요!',
    //   reviewImages: [
    //     'https://example.com/images/review12_1.jpg',
    //     'https://example.com/images/review12_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile11.jpg'],
    //   createdAt: '2023-08-10T17:30:00Z',
    //   updatedAt: '2023-08-10T17:30:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 청담점',
    //     address: '서울시 강남구 청담동 909'
    //   }
    // },
    // {
    //   id: '550e8403-e29b-41d4-a716-446655440000',
    //   nickname: '친구모임',
    //   storeId: 1013,
    //   userId: 'user-f2a3b4c5-d6e7-89ab-f234-56789abcdef',
    //   title: '친구들과 함께',
    //   content: '친구들과 함께 방문했는데 모두 만족했어요.',
    //   reviewImages: [
    //     'https://example.com/images/review13_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile12.jpg'],
    //   createdAt: '2023-08-05T12:10:00Z',
    //   updatedAt: '2023-08-05T12:10:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 성수점',
    //     address: '서울시 성동구 성수동 1010'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d483',
    //   nickname: '단맛싫어',
    //   storeId: 1014,
    //   userId: 'user-a3b4c5d6-e7f8-9abc-a345-6789abcdef01',
    //   title: '음료가 달아요',
    //   content: '음료가 조금 달아요.',
    //   reviewImages: [],
    //   profileImage: ['https://example.com/images/profile13.jpg'],
    //   createdAt: '2023-07-28T14:50:00Z',
    //   updatedAt: '2023-07-28T14:50:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 연남점',
    //     address: '서울시 마포구 연남동 1111'
    //   }
    // },
    // {
    //   id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '공간중요',
    //   storeId: 1015,
    //   userId: 'user-b4c5d6e7-f8a9-bcde-b456-789abcdef012',
    //   title: '매장이 좁아요',
    //   content: '매장이 조금 좁아요.',
    //   reviewImages: [
    //     'https://example.com/images/review15_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile14.jpg'],
    //   createdAt: '2023-07-20T11:25:00Z',
    //   updatedAt: '2023-07-20T11:25:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 합정점',
    //     address: '서울시 마포구 합정동 1212'
    //   }
    // },
    // {
    //   id: '550e8404-e29b-41d4-a716-446655440000',
    //   nickname: '시즌메뉴',
    //   storeId: 1016,
    //   userId: 'user-c5d6e7f8-a9b0-cdef-c567-89abcdef0123',
    //   title: '시즌 메뉴 추천',
    //   content: '새로 나온 시즌 메뉴가 정말 맛있어요.',
    //   reviewImages: [
    //     'https://example.com/images/review16_1.jpg',
    //     'https://example.com/images/review16_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile15.jpg'],
    //   createdAt: '2023-07-15T16:40:00Z',
    //   updatedAt: '2023-07-15T16:40:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 을지로점',
    //     address: '서울시 중구 을지로 1313'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d484',
    //   nickname: '직원추천',
    //   storeId: 1001,
    //   userId: 'user-d6e7f8a9-b0c1-defg-d678-9abcdef01234',
    //   title: '직원 추천 메뉴',
    //   content: '직원분들이 추천해주신 메뉴가 좋았어요.',
    //   reviewImages: [
    //     'https://example.com/images/review17_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile16.jpg'],
    //   createdAt: '2023-07-10T13:15:00Z',
    //   updatedAt: '2023-07-10T13:15:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 강남점',
    //     address: '서울시 강남구 테헤란로 123'
    //   }
    // },
    // {
    //   id: '6ba7b815-9dad-11d1-80b4-00c04fd430c8',
    //   nickname: '가족모임',
    //   storeId: 1002,
    //   userId: 'user-e7f8a9b0-c1d2-efgh-e789-abcdef012345',
    //   title: '가족 모임으로 방문',
    //   content: '가족 모임으로 방문했는데 만족스러웠어요.',
    //   reviewImages: [
    //     'https://example.com/images/review18_1.jpg',
    //     'https://example.com/images/review18_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile17.jpg'],
    //   createdAt: '2023-07-05T18:30:00Z',
    //   updatedAt: '2023-07-05T18:30:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-003',
    //   place: {
    //     name: '디저트비 홍대점',
    //     address: '서울시 마포구 홍대로 456'
    //   }
    // },
    // {
    //   id: '550e8405-e29b-41d4-a716-446655440000',
    //   nickname: '차마니아',
    //   storeId: 1003,
    //   userId: 'user-f8a9b0c1-d2e3-fghi-f89a-bcdef0123456',
    //   title: '디저트와 차',
    //   content: '디저트와 함께 제공되는 차가 좋아요.',
    //   reviewImages: [
    //     'https://example.com/images/review19_1.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile18.jpg'],
    //   createdAt: '2023-06-28T15:20:00Z',
    //   updatedAt: '2023-06-28T15:20:00Z',
    //   saved: false,
    //   mateCategoryId: 'category-001',
    //   place: {
    //     name: '디저트비 이태원점',
    //     address: '서울시 용산구 이태원로 789'
    //   }
    // },
    // {
    //   id: 'f47ac10b-58cc-4372-a567-0e02b2c3d485',
    //   nickname: '예약편리',
    //   storeId: 1004,
    //   userId: 'user-a9b0c1d2-e3f4-ghij-a9bc-def01234567',
    //   title: '예약 시스템 편리',
    //   content: '예약 시스템이 편리해요.',
    //   reviewImages: [
    //     'https://example.com/images/review20_1.jpg',
    //     'https://example.com/images/review20_2.jpg'
    //   ],
    //   profileImage: ['https://example.com/images/profile19.jpg'],
    //   createdAt: '2023-06-20T10:10:00Z',
    //   updatedAt: '2023-06-20T10:10:00Z',
    //   saved: true,
    //   mateCategoryId: 'category-002',
    //   place: {
    //     name: '디저트비 명동점',
    //     address: '서울시 중구 명동길 101'
    //   }
    // },
  ];

  async getMine(data: BaseRequestData<unknown>): Promise<unknown> {
    return this.sampleReviews.filter(
      (review) => review.userId === 'user-a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    );
  }

  async edit({ data }: BaseRequestData<ReviewUpdateData>): Promise<Review> {
    if (!data) {
      throw new Error('Review not found');
    }

    const reviewIndex = this.sampleReviews.findIndex(
      (review) => review.id === data.id,
    );

    if (reviewIndex === -1 || !this.sampleReviews[reviewIndex]) {
      throw new Error('Review not found');
    }

    return this.sampleReviews[reviewIndex];
  }

  async delete({ data }: BaseRequestData<ReviewUpdateData>): Promise<void> {
    if (!data) {
      throw new Error('Review not found');
    }

    const reviewIndex = this.sampleReviews.findIndex(
      (review) => review.id === data.id,
    );

    if (reviewIndex === -1 || !this.sampleReviews[reviewIndex]) {
      throw new Error('Review not found');
    }

    this.sampleReviews.splice(reviewIndex, 1);
  }

  async getAll(data: BaseRequestData<unknown>): Promise<ReviewListResponse> {
    return {
      reviews: this.sampleReviews,
      isLast: true,
    };
  }

  getDetail(data: BaseRequestData<ReviewUpdateData>): Promise<Review> {
    throw new Error('Method not implemented.');
  }

  cancelSave(data: BaseRequestData<CancelSaveRequest>): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(data: BaseRequestData<SaveReviewRequest>): Promise<SaveReviewResponse> {
    throw new Error('Method not implemented.');
  }
  getSaved(
    data: BaseRequestData<SavedReviewListRequest>,
  ): Promise<SavedReviewListResponse> {
    throw new Error('Method not implemented.');
  }
}
