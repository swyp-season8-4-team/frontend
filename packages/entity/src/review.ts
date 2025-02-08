export interface Review {
  id: number;
  userId: number;
  storeId: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReviewTag {
  id: number;
  name: string;
}

export interface StoreReview {
  id: number;
  storeId: number;
  userId: number;
  content: string;
  rating: number;
  images: string[];
  createdAt?: string;
}
