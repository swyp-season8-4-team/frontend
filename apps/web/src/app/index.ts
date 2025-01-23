/**
 * dynamic api is need to async call (nextjs 15)
 * @description: https://nextjs.org/docs/messages/sync-dynamic-apis
 */
export interface WithParams {
  params: Promise<{ [key: string]: string | undefined }>;
}

export interface WithSearchParams {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}