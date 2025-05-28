import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environment';
import { IUser } from '../interfaces/IUser.interface';
import { loggedInUserResponse } from '../interfaces/ILoginResponse.interface';
import { BaseResponse } from '../interfaces/IProduct.interface';

const API_URL = environment.AUTH_API;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(`${API_URL}public`);
  }

  getUserData(userId: string): Observable<BaseResponse<IUser>> {
    return this.http.get<BaseResponse<IUser>>(`${API_URL}private/${userId}`);
  }

  getAdminBoard(): Observable<BaseResponse<IUser[]>> {
    return this.http.get<BaseResponse<IUser[]>>(API_URL + 'users/');
  }

  deleteUser(userId: string): Observable<{}> {
    return this.http.delete<{}>(`${API_URL}users/${userId}`);
  }

  updateUser(user: IUser): Observable<BaseResponse<IUser>> {
    return this.http.patch<BaseResponse<IUser>>(
      `${API_URL}users/${user._id}`,
      user
    );
  }
}
