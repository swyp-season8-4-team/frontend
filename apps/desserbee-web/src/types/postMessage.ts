// FIXME: 한개파일 말고 분리해서 관리

import type { CommunityCategory } from "@repo/entity/src/community";

export enum SearchMessageAction {
  OpenSearchBar = 'open-search-bar',
  GetCategories = 'get-categories',
  GetSearch = 'get-search',
}

export interface CommunitySearchMessagePayload {
  selectedCategory?: CommunityCategory;
  keyword?: string;
}

export interface SearchMessageData {
  action: SearchMessageAction;
  payload?: CommunitySearchMessagePayload;
}
