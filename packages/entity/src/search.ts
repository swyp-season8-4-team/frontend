import type { BaseRequestData } from './appMetadata';

export interface PopularSearchData {
  keyword: string;
  searchCount: number;
  rank: number;
  difference: number;
}

export interface GetPopularSearchDataResonse {
  searches: PopularSearchData[];
  lastUpdatedTime: string;
}

export interface SearchRepository {
  getPopularSearchKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<GetPopularSearchDataResonse>;
  getRecentSearchKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<string[]>; //TODO: api 명세서 업데이트 되면 추가
  deleteRecentSearchKeyword({
    authorization,
  }: BaseRequestData<void>): Promise<void>; //TODO: api 명세서 업데이트 되면 추가
  deleteRecentSearchKeywordsAll({
    authorization,
  }: BaseRequestData<void>): Promise<void>; //TODO: api 명세서 업데이트 되면 추가
}
