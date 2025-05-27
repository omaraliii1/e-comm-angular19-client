export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  imagePath: string;
}

export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
  errors?: string[];
}
