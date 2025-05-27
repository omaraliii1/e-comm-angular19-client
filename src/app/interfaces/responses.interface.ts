export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface BaseError {
  status: number;
  message: string;
  errors: string[];
}
