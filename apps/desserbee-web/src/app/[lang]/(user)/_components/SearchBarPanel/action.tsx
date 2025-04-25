'use server';

import SearchService from '@repo/usecase/src/searchService';
import AuthNextAppRouteRepository from '@repo/infrastructures/src/repositories/authNextAppRouteRepository';
import SearchAPIRepository from '@repo/infrastructures/src/repositories/searchAPIRepository';
import { commonErrorHandler } from '@/error/commonErrorHandler';

const searchService = new SearchService({
  searchRepository: new SearchAPIRepository(),
  authRepository: new AuthNextAppRouteRepository(),
});
export async function getPopularKeywords() {
  const result = await commonErrorHandler(searchService.getPopularKeywords());

  return result;
}

export async function getRecentKeywords() {
  const result = await commonErrorHandler(searchService.getRecentKeywords());

  return result;
}

export async function deleteRecentKeyword(searchId: number) {
  const result = await commonErrorHandler(
    searchService.deleteRecentKeyword({ searchId }),
  );

  return result;
}

export async function deleteRecentKeywordsAll() {
  const result = await commonErrorHandler(
    searchService.deleteRecentKeywordsAll(),
  );

  return result;
}
