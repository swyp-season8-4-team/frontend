import type { Review, ReviewContent, ReviewImage } from "@repo/entity/src/review";
import type { RawReview, RawReviewContent, RawReviewImage } from "@repo/api/src/desserbee-web/review";
import type { CommunityDessertReviewCategory } from "@repo/entity/src/community";

export default class ReviewConverter {
  private convertRawToReviewImage(raw: RawReviewImage): ReviewImage {
    return {
      id: raw.reviewImageId,
      url: raw.reviewImages,
    }
  }

  private convertReviewImageToRaw(reviewImage: ReviewImage): RawReviewImage {
    return {
      reviewImageId: reviewImage.id,
      reviewImages: reviewImage.url,
    }
  }

  private convertRawToReviewContent(raw: RawReviewContent): ReviewContent {
    console.log(raw);
    return {
      type: raw.type,
      value: raw.value ?? undefined,
      imageId: raw.imageId ?? undefined,
      imageIndex: raw.imageIndex ?? undefined,
      imageUrl: raw.imageUrl ?? undefined,
    }
  }

  private convertReviewContentToRaw(reviewContent: ReviewContent): RawReviewContent {
    return {
      type: reviewContent.type,
      value: reviewContent.value ?? null,
      imageId: reviewContent.imageId ?? null,
      imageIndex: reviewContent.imageIndex ?? null,
      imageUrl: reviewContent.imageUrl ?? null,
    }
  }

  convertCategoryToRaw(category: CommunityDessertReviewCategory): number {
    if (category === '입터짐 조심') {
      return 1;
    } else if (category === '신상템 추천') {
      return 2;
    } else if (category === '세일 정보') {
      return 3;
    } else if (category === '웰시 디저트') {
      return 4;
    } else if (category === '빵지순례') {
      return 5;
    } else if (category === '내돈내산') {
      return 6;
    } else if (category === '핫플레이스') {
      return 7;
    }

    throw new Error('Invalid category');
  }
  
  convertReviewToRaw(review: Review): RawReview {
    return {
      reviewUuid: review.id,
      title: review.title,
      contents: review.contents.map((content) => this.convertReviewContentToRaw(content)),
      profileImage: review.profileImage,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      saved: review.saved,
      place: {
        placeName: review.place.name,
        address: review.place.address ?? null,
        latitude: review.place.latitude ?? null,
        longitude: review.place.longitude ?? null,
      },
      nickname: review.nickname,
      reviewCategory: review.category,
      storeId: review.storeId,
      userUuid: review.userId,
      gender: review.gender,
      views: review.viewCount,
    }
  }

  convertRawToReview(raw: RawReview): Review {
    console.log(raw);
    return {
      id: raw.reviewUuid,
      title: raw.title,
      contents: raw.contents.map((content) => this.convertRawToReviewContent(content)),
      profileImage: raw.profileImage,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      saved: raw.saved,
      place: {
        name: raw.place.placeName,
        address: raw.place.address,
        latitude: raw.place.latitude,
        longitude: raw.place.longitude,
      },
      nickname: raw.nickname,
      storeId: raw.storeId,
      userId: raw.userUuid,
      gender: raw.gender,
      viewCount: raw.views,
      category: raw.reviewCategory,
    }
  }
}
