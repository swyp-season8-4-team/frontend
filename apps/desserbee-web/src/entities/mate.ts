export interface Mate {
  id: string;
  userId: string;
  title: string;
  content: string;
  recruit: boolean; // 모집 여부
  createdAt: string;
  updatedAt: string;
  mateCategoryId: string;
}

export interface MateRepository {
  
}