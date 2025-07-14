import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { BaseResponse, IProduct } from '../interfaces/IProduct.interface';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<BaseResponse<IProduct[]>> {
    return this.http.get<BaseResponse<IProduct[]>>(`${API_URL}products/`);
  }

  deleteProduct(id: string) {
    return this.http.delete<BaseResponse<IProduct>>(`${API_URL}products/${id}`);
  }

  addProduct(product: FormData): Observable<BaseResponse<IProduct>> {
    return this.http.post<BaseResponse<IProduct>>(
      `${API_URL}products/`,
      product
    );
  }
}
