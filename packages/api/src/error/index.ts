export interface ErrorResponseData {
  status: number;
  code: string;
  message?: string;
}

export function isErrorResponseData(
  error: unknown,
): error is ErrorResponseData {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'code' in error &&
    'message' in error
  );
}

export class HTTPError extends Error {
  private responseData: ErrorResponseData;

  constructor({
    status,
    code,
    message,
  }: {
    status: number;
    code: string;
    message?: string;
  }) {
    super(message);
    this.responseData = { status, code, message };
  }

  get data(): ErrorResponseData {
    return this.responseData;
  }
}
