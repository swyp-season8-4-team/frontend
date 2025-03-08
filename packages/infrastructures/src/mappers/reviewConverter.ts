import type { Review, ReviewContent, ReviewImage } from "@repo/entity/src/review";
import type { RawReview, RawReviewContent, RawReviewImage } from "@repo/api/src/desserbee-web/review";

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
    return {
      type: raw.type,
      ...(raw.value && { value: raw.value }),
      ...(raw.imageId && { imageId: raw.imageId }),
      ...(raw.imageIndex && { imageIndex: raw.imageIndex }),
      ...(raw.imageUrl && { imageUrl: raw.imageUrl }),
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
