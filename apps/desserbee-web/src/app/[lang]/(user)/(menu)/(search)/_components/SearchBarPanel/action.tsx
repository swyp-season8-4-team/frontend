'use server';

import SearchService from '@repo/usecase/src/searchService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import SearchAPIRepository from '@repo/infrastructures/src/repositories/searchAPIRepository';

const searchService = new SearchService({
  searchRepository: new SearchAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});
export async function getPopularSearchKeywords() {
  const result = await searchService.getPopularSearchKeywords();

  return result;
}

export async function getRecentSearchKeywords() {
  const result = await searchService.getRecentSearchKeywords();

  return result;
}

export async function deleteRecentSearchKeyword() {
  const result = await searchService.deleteRecentSearchKeyword(); //TODO: API 명세서 업데이트 후 수정

  return result;
}

export async function deleteRecentSearchKeywordsAll() {
  const result = await searchService.deleteRecentSearchKeywordsAll();

  return result;
}
