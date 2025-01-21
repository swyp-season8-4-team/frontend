export interface ReponseErrorData {
  statusCode: number;
  message?: string;
}

export class HTTPError extends Error {
  private responseData: ReponseErrorData;

  constructor(statusCode: number, message?: string) {
    super(message);
    this.responseData = { statusCode, message };
  }

  get data(): ReponseErrorData {
    return this.responseData;
  }
}
