export class ApiError extends Error {
  public readonly data: unknown;
  public readonly statusCode: number;

  constructor(message: string, data: unknown, statusCode: number) {
    super(message);
    this.data = data;
    this.statusCode = statusCode;
  }
}
