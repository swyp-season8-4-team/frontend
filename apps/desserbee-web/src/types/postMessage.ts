export enum SearchMessageAction {
  OpenSearchBar = 'open-search-bar',
}

export interface SearchMessageData {
  action: SearchMessageAction;
  payload?: unknown;
}
