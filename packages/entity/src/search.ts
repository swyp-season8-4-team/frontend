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
  getPopularKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<GetPopularSearchDataResonse>;
  getRecentKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<string[]>; //TODO: api 명세서 업데이트 되면 추가
  deleteRecentKeyword({ authorization }: BaseRequestData<void>): Promise<void>; //TODO: api 명세서 업데이트 되면 추가
  deleteRecentKeywordsAll({
    authorization,
  }: BaseRequestData<void>): Promise<void>; //TODO: api 명세서 업데이트 되면 추가
}
