export class ApiResponse<T> {
  public readonly data: T;
  public readonly statusCode: number;

  constructor(params: { body: T; statusCode: number }) {
    this.data = params.body;
    this.statusCode = params.statusCode;
  }
}
