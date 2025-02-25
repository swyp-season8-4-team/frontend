export interface OneLineReview {
  reviewUuid: string;
  storeId: number;
  nickname: string;
  profileImage: string;
  content: string;
  rating: number;
  createdAt: string;
  images: string[];
}

export interface ReviewTag {
  id: number;
  name: string;
}
