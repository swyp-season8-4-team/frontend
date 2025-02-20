export interface OneLineReview {
  reviewUuid: number;
  storeId: number;
  content: string;
  rating: number;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewTag {
  id: number;
  name: string;
}
