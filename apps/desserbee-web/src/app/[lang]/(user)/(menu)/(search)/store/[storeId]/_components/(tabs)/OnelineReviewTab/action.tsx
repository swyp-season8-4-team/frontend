'use server';

import { cookies } from 'next/headers';

export async function saveReviewPageData(storeInfo: {
  storeUuid: string;
  totalReviewCount: number;
  averageRating: number;
  storeReviews: Array<{
    userUuid: string;
    reviewUuid: string;
    content: string;
    createdAt: string;
    images: string[];
    nickname: string;
    profileImage: string;
    rating: number;
  }>;
}) {
  const cookieStore = await cookies();
  cookieStore.set('reviewPageData', JSON.stringify(storeInfo));
}
