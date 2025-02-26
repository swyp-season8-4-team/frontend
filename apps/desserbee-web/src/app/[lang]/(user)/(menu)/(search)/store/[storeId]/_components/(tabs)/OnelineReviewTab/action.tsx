'use server';

import { cookies } from 'next/headers';

export async function saveReviewPageData(storeInfo: {
  totalReviewCount: number;
  averageRating: number;
  storeReviews: Array<{
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
