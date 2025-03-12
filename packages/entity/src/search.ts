import type { BaseRequestData } from './appMetadata';

export interface PopularSearchData {
  keyword: string;
  searchCount: number;
  rank: number;
  difference: number;
}

export interface RecentSearchData {
  id: number;
  keyword: string;
  createdAt: string;
}

export interface GetPopularSearchDataResonse {
  searches: PopularSearchData[];
  lastUpdatedTime: string;
}

export interface DeleteRecentKeywordRequest {
  searchId: number;
}

export interface SearchRepository {
  getPopularKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<GetPopularSearchDataResonse>;
  getRecentKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<RecentSearchData[]>;
  deleteRecentKeyword({
    data,
    authorization,
  }: BaseRequestData<DeleteRecentKeywordRequest>): Promise<void>;
  deleteRecentKeywordsAll({
    data,
    authorization,
  }: BaseRequestData<void>): Promise<void>;
}
