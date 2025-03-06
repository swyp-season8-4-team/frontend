// FIXME: 한개파일 말고 분리해서 관리

import type { MateCommunityCategory } from "@repo/entity/src/mate";

export enum SearchMessageAction {
  OpenSearchBar = 'open-search-bar',
}

export interface SearchMessageData {
  action: SearchMessageAction;
  payload?: unknown;
}

export enum MateSearchMessageAction {
  GetMateCategories = 'get-mate-categories',
  GetMateSearch = 'get-mate-search',
}

export interface MateSearchMessagePayload {
  selectedCategory?: MateCommunityCategory;
  keyword?: string;
}

export interface MateSearchMessageData {
  action: MateSearchMessageAction;
  payload?: MateSearchMessagePayload;
}
