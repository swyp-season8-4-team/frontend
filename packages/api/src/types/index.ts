type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'DELETE' | 'PUT';

export type Headers = Record<string, string>;
export type Queries = Record<string, string | string[] | undefined>;

export enum AbortControllerReason {
  userCancel = 'user cancel',
}

export interface RequestData<D = unknown> {
  abortController?: AbortController;
  method: HTTPMethod;
  url?: string;
  data?: D;
  headers?: Omit<Headers, 'Content-Type'>;
  query?: Queries;
  retry?: boolean;
}
