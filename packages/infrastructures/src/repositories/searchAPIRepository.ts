import APIRepository from './apiRepository';
import type { BaseRequestData } from '@repo/entity/src/appMetadata';
import fetch from '@repo/api/src/fetch';
import type {
  GetPopularSearchDataResonse,
  SearchRepository,
} from '@repo/entity/src/search';

export default class SearchAPIRepository
  extends APIRepository
  implements SearchRepository
{
  async getPopularKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<GetPopularSearchDataResonse> {
    const response = await fetch<void, GetPopularSearchDataResonse>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/search/popular`,
    });

    console.log(response);
    return response;
  }

  async getRecentKeywords({
    authorization,
  }: BaseRequestData<void>): Promise<string[]> {
    const response = await fetch<void, string[]>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'GET',
      url: `${this.endpoint}/search/recent`,
    });

    return response;
  }

  //TODO: api 명세서 업데이트되면 수정
  async deleteRecentKeyword({
    authorization,
  }: BaseRequestData<void>): Promise<void> {
    const response = await fetch<void, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url: `${this.endpoint}/search/recent`, //TODO: api 명세서 업데이트되면 수정
    });

    return response;
  }

  async deleteRecentKeywordsAll({
    authorization,
  }: BaseRequestData<void>): Promise<void> {
    const response = await fetch<void, void>({
      ...(authorization && {
        headers: {
          Authorization: authorization,
        },
      }),
      method: 'DELETE',
      url: `${this.endpoint}/search/recent`, //TODO: api 명세서 업데이트되면 수정
    });

    return response;
  }
}
